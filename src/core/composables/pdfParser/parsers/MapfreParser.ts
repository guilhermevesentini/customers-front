import type { IClient, IProduct } from "@/modules/Clients/@types/types";
import { BaseSeguradoraParser } from "../base/BaseSeguradoraParser";
import { EStatus } from "@/core/enums/enums";
import { createProductData } from "@/modules/Clients/factories/ProductsFactory";

/**
 * Parser específico para documentos da Mapfre Seguros
 * Implementa a estratégia de parsing para o formato específico da Mapfre
 */
export class MapfreParser extends BaseSeguradoraParser {
  /**
   * Identifica se o PDF é da Mapfre
   * Verifica pela presença de indicadores específicos da Mapfre no texto
   */
  canParse(text: string, fileName: string): boolean {
    const mapfreIndicators = [/MAPFRE SEGUROS GERAIS/i, /MAPFRE/i, /Código na SUSEP:.*6238/i];

    return mapfreIndicators.some((pattern) => pattern.test(text));
  }

  /**
   * Extrai dados do cliente a partir do PDF da Mapfre
   */
  parse(text: string, fileName: string): Partial<IClient> {
    const clientData = this.createBaseClientData();

    // Extrair nome do arquivo primeiro (fallback)
    const nameFromFile = this.extractNameFromFileName(fileName);
    if (nameFromFile) {
      clientData.details!.name = nameFromFile;
    }

    // Extrair dados da seção "DADOS DO SEGURADO"
    this.extractPersonalData(text, clientData);
    this.extractAddressData(text, clientData);
    this.extractContactData(text, clientData);
    this.extractProductData(text, fileName, clientData);

    return clientData;
  }

  /**
   * Extrai dados pessoais do segurado
   */
  private extractPersonalData(text: string, clientData: Partial<IClient>): void {
    // Extrair Nome
    if (!clientData.details!.name || text.includes("DADOS DO SEGURADO")) {
      const namePattern =
        /Nome[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Nome Social|Tipo|CPF|$)/i;
      const nameMatch = text.match(namePattern);
      if (nameMatch && nameMatch[1]) {
        clientData.details!.name = nameMatch[1].trim().replace(/\s+/g, " ");
      }
    }

    // Extrair CPF
    const cpfPattern = /DADOS DO SEGURADO[\s\S]*?CPF[:\s]+(\d{3}\.\d{3}\.\d{3}-\d{2})/i;
    const cpfMatch = text.match(cpfPattern);
    if (cpfMatch && cpfMatch[1]) {
      clientData.details!.cpf = cpfMatch[1].replace(/[^\d]/g, "");
    }

    // Extrair Data de nascimento
    const birthdayPattern = /Data de nascimento[:\s]+(\d{2}\/\d{2}\/\d{4})/i;
    const birthdayMatch = text.match(birthdayPattern);
    if (birthdayMatch && birthdayMatch[1]) {
      clientData.details!.birthday = birthdayMatch[1].trim();
    }
  }

  /**
   * Extrai dados de endereço
   */
  private extractAddressData(text: string, clientData: Partial<IClient>): void {
    // Endereço
    const addressPattern =
      /DADOS DO SEGURADO[\s\S]*?Endereço[:\s]+([A-Z0-9ÁÉÍÓÚÂÊÔÇ\s,]+?)(?:\s+Bairro|CEP|Cidade|$)/i;
    const addressMatch = text.match(addressPattern);
    if (addressMatch && addressMatch[1]) {
      const fullAddress = addressMatch[1].trim();
      const addressParts = fullAddress.match(/^(.+?)\s+(\d+)\s*(.*)$/);
      if (addressParts) {
        clientData.address!.address = addressParts[1].trim();
        clientData.address!.number = addressParts[2].trim();
        clientData.address!.complement = addressParts[3]?.trim() || "";
      } else {
        clientData.address!.address = fullAddress;
      }
    }

    // Bairro
    const bairroPattern =
      /DADOS DO SEGURADO[\s\S]*?Bairro[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|Cidade|$)/i;
    const bairroMatch = text.match(bairroPattern);
    if (bairroMatch && bairroMatch[1]) {
      const bairro = bairroMatch[1].trim();
      if (clientData.address!.complement) {
        clientData.address!.complement += ` - ${bairro}`;
      } else {
        clientData.address!.complement = bairro;
      }
    }

    // Cidade
    const cidadePattern =
      /DADOS DO SEGURADO[\s\S]*?Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|UF|$)/i;
    const cidadeMatch = text.match(cidadePattern);
    if (cidadeMatch && cidadeMatch[1]) {
      clientData.address!.city = cidadeMatch[1].trim();
    }

    // CEP
    const cepPattern = /DADOS DO SEGURADO[\s\S]*?CEP[:\s]+(\d{5}-?\d{3})/i;
    const cepMatch = text.match(cepPattern);
    if (cepMatch && cepMatch[1]) {
      clientData.address!.zipcode = cepMatch[1].replace(/[^\d-]/g, "");
    }

    // UF
    const ufPattern = /DADOS DO SEGURADO[\s\S]*?UF[:\s]+([A-Z]{2})/i;
    const ufMatch = text.match(ufPattern);
    if (ufMatch && ufMatch[1]) {
      clientData.address!.state = ufMatch[1].trim();
    }
  }

  /**
   * Extrai dados de contato
   */
  private extractContactData(text: string, clientData: Partial<IClient>): void {
    // Telefones (priorizar celular)
    const phonePatterns = [
      /DADOS DO SEGURADO[\s\S]*?Telefone\s+celular[:\s]+(\d{10,11})/i,
      /DADOS DO SEGURADO[\s\S]*?Telefone\s+residencial[:\s]+(\d{10,11})/i,
      /DADOS DO SEGURADO[\s\S]*?Telefone\s+comercial[:\s]+(\d{10,11})/i,
    ];

    for (const pattern of phonePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        clientData.details!.phone = match[1];
        break;
      }
    }

    // Email
    const emailPattern = /Email[:\s]+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
    const emailMatch = text.match(emailPattern);
    if (emailMatch && emailMatch[1]) {
      clientData.details!.email = emailMatch[1].trim();
    }
  }

  /**
   * Extrai dados do produto/apólice
   */
  private extractProductData(text: string, fileName: string, clientData: Partial<IClient>): void {
    // Extrair número da apólice
    const apolicePattern = /Nº Apólice[:\s]+(\d+)/i;
    const apoliceMatch = text.match(apolicePattern);

    let product: IProduct;

    if (apoliceMatch && apoliceMatch[1]) {
      const apoliceNumber = apoliceMatch[1].trim();
      product = this.createProductFromApoliceNumber(apoliceNumber, clientData.details?.name || "");

      // Extrair datas de vigência
      const vigenciaPattern =
        /Vigência início 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?Término 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})/i;
      const vigenciaMatch = text.match(vigenciaPattern);
      if (vigenciaMatch && vigenciaMatch[1] && vigenciaMatch[2]) {
        product.start = vigenciaMatch[1].trim();
        product.end = vigenciaMatch[2].trim();
      }

      // Extrair valor do prêmio
      const premioPattern = /Prêmio total[:\s]+([\d.,]+)/i;
      const premioMatch = text.match(premioPattern);
      if (premioMatch && premioMatch[1]) {
        const valorStr = premioMatch[1].replace(/\./g, "").replace(",", ".");
        const valor = parseFloat(valorStr);
        if (!isNaN(valor)) {
          product.price = valor;
        }
      }
    } else {
      // Fallback: usar nome do arquivo
      const fileNameMatch = fileName.match(/Apolice_([^_]+)_(.+)\.pdf/i);
      if (fileNameMatch && fileNameMatch[1]) {
        product = this.createProductFromApoliceNumber(
          fileNameMatch[1],
          clientData.details?.name || "",
        );
      } else {
        // Criar produto genérico
        product = createProductData(
          {
            tipo: "Seguro",
            description: "Apólice não identificada",
            status: EStatus.active,
          } as IProduct,
          clientData.details?.name || "",
        );
      }
    }

    clientData.products = [product];
  }
}
