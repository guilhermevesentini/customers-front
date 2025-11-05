import * as pdfjsLib from "pdfjs-dist";
import type { IFiles, IClient } from "@/modules/Clients/@types/types";
import { SeguradoraParserFactory } from "./factories/SeguradoraParserFactory";
import { EStatus } from "@/core/enums/enums";
import { createProductData } from "@/modules/Clients/factories/ProductsFactory";
import type { IProduct } from "@/modules/Clients/@types/types";

// Configurar o worker do pdfjs
// Usar worker local da pasta public (copiado do node_modules)
// O arquivo está em /public/pdf.worker.min.mjs
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

/**
 * Extrai texto de um PDF a partir de um arquivo base64
 */
export async function extractTextFromPdf(pdfFile: IFiles): Promise<string> {
  try {
    // Converter base64 para Uint8Array
    const base64Data = pdfFile.content.split(",")[1];
    if (!base64Data) {
      throw new Error("Base64 data não encontrado no arquivo");
    }

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Verificar se os bytes parecem ser um PDF válido
    const pdfHeader = String.fromCharCode(...bytes.slice(0, 4));
    if (pdfHeader !== "%PDF") {
      throw new Error("Arquivo não parece ser um PDF válido");
    }

    // Carregar o PDF com opções de timeout e tratamento de erro
    const loadingTask = pdfjsLib.getDocument({
      data: bytes,
      verbosity: 0, // Reduzir logs
    });

    // Aguardar com timeout de 30 segundos
    const pdf = (await Promise.race([
      loadingTask.promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout ao carregar PDF")), 30000),
      ),
    ])) as any;
    let fullText = "";

    // Extrair texto de todas as páginas preservando melhor a estrutura
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Tentar preservar melhor a estrutura do texto
      let pageText = "";
      let lastY = -1;

      for (const item of textContent.items as any[]) {
        const currentY = item.transform[5]; // Posição Y do texto

        // Se mudou de linha, adicionar quebra
        if (lastY !== -1 && Math.abs(currentY - lastY) > 5) {
          pageText += "\n";
        }

        pageText += item.str + " ";
        lastY = currentY;
      }

      fullText += pageText + "\n\n";
    }

    return fullText;
  } catch (error: any) {
    // Verificar se é erro de senha/criptografia
    const errorMessage = error?.message || error?.toString() || "";
    const errorName = error?.name || "";

    // Detectar erros de senha (pdfjs-dist retorna diferentes códigos)
    if (
      errorName === "PasswordException" ||
      errorMessage.toLowerCase().includes("password") ||
      errorMessage.toLowerCase().includes("senha") ||
      errorMessage.toLowerCase().includes("encrypted") ||
      errorMessage.toLowerCase().includes("criptografado") ||
      errorMessage.toLowerCase().includes("encryption") ||
      error?.code === 2 || // Código de erro do pdfjs para PDFs protegidos
      error?.code === 18 // Código alternativo de erro
    ) {
      throw new Error("PDF protegido por senha. Este arquivo não pode ser processado sem a senha.");
    }

    // Mensagem de erro mais detalhada para outros erros
    let detailedMessage = "Não foi possível extrair texto do PDF";
    if (errorMessage) {
      detailedMessage += `: ${errorMessage}`;
    } else if (errorName) {
      detailedMessage += `: ${errorName}`;
    }

    // Log detalhado para debug
    // console.error("Detalhes do erro:", {
    //   name: errorName,
    //   message: errorMessage,
    //   code: error?.code,
    //   stack: error?.stack,
    // });

    throw new Error(detailedMessage);
  }
}

/**
 * Extrai informações do cliente a partir do texto do PDF
 * Usa Strategy Pattern para aplicar o parser adequado para cada seguradora
 */
export function parseClientInfoFromPdf(text: string, fileName: string): Partial<IClient> {
  // Usar Factory para obter o parser adequado
  const parser = SeguradoraParserFactory.getParser(text, fileName);

  if (parser) {
    // Parser específico encontrado - usar estratégia da seguradora
    return parser.parse(text, fileName);
  }

  // Fallback: parser genérico (caso nenhuma seguradora seja identificada)
  console.warn("Nenhum parser específico encontrado, usando parser genérico");
  return parseGenericPdf(text, fileName);
}

/**
 * Parser genérico como fallback
 * Extrai apenas dados básicos do nome do arquivo quando nenhuma seguradora é identificada
 */
function parseGenericPdf(text: string, fileName: string): Partial<IClient> {
  const clientData: Partial<IClient> = {
    details: {
      name: "",
      cpf: "",
      rg: "",
      phone: "",
      birthday: "",
      status: EStatus.pending,
      email: "",
    },
    address: {
      address: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipcode: "",
    },
    products: [],
    documents: [],
  };

  // Extrair nome do arquivo (formato: Apolice_XXXXX_nome-cliente.pdf)
  const fileNameMatch = fileName.match(/Apolice_([^_]+)_(.+)\.pdf/i);
  if (fileNameMatch) {
    const apoliceNumber = fileNameMatch[1];
    const nameFromFile = fileNameMatch[2]
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    clientData.details!.name = nameFromFile;

    // Criar produto básico
    const product = createProductData(
      {
        tipo: "Seguro",
        description: `Apólice ${apoliceNumber}`,
        status: EStatus.active,
      } as IProduct,
      nameFromFile,
    );

    clientData.products = [product];
  }

  return clientData;
}

/**
 * Processa um PDF e retorna os dados do cliente
 * Extrai dados do nome do arquivo e, se possível, do conteúdo do PDF
 */
export async function processPdfToClient(pdfFile: IFiles): Promise<Partial<IClient>> {
  let text = "";

  // Tentar extrair texto do PDF
  try {
    text = await extractTextFromPdf(pdfFile);
  } catch (error: any) {
    const errorMessage = error?.message || error?.toString() || "";

    // Se for erro de senha, lançar o erro para cima (não continuar)
    if (
      errorMessage.toLowerCase().includes("senha") ||
      errorMessage.toLowerCase().includes("password") ||
      errorMessage.toLowerCase().includes("protegido por senha")
    ) {
      throw error; // Lançar erro de senha para cima
    }

    // Para outros erros, continuar apenas com dados do nome do arquivo
    console.warn(
      "Não foi possível extrair texto do PDF, continuando apenas com dados do arquivo:",
      error,
    );
    text = "";
  }

  // Extrair informações do arquivo e do texto (se disponível)
  const clientData = parseClientInfoFromPdf(text, pdfFile.name);

  // Validar se conseguimos extrair pelo menos o nome do arquivo
  // Se não conseguir nem o nome, lançar erro
  if (!clientData.details?.name || clientData.details.name.trim() === "") {
    throw new Error(
      "Não foi possível extrair dados do PDF e o nome do arquivo não segue o formato esperado (Apolice_XXXXX_nome-cliente.pdf)",
    );
  }

  // Adicionar o PDF aos documentos do cliente
  clientData.documents = [pdfFile];

  // Adicionar o PDF também aos arquivos do produto (apólice)
  if (clientData.products && clientData.products.length > 0) {
    clientData.products[0].files = [pdfFile];
  }

  return clientData;
}
