import type { IClient, IProduct } from "@/modules/Clients/@types/types";
import { BaseSeguradoraParser } from "../base/BaseSeguradoraParser";
import { EStatus } from "@/core/enums/enums";
import { createProductData } from "@/modules/Clients/factories/ProductsFactory";

/**
 * Parser específico para documentos da HDI Seguros
 * Implementa a estratégia de parsing para o formato específico da HDI
 */
export class HdiParser extends BaseSeguradoraParser {
  /**
   * Identifica se o PDF é da HDI
   * Verifica pela presença de indicadores específicos da HDI no texto
   */
  canParse(text: string, fileName: string): boolean {
    const hdiIndicators = [
      /HDI SEGUROS S\.A\./i,
      /HDI SEGUROS/i,
      /Hdi Auto Perfil/i,
      /www\.hdi\.com\.br/i,
    ];

    return hdiIndicators.some((pattern) => pattern.test(text));
  }

  /**
   * Extrai dados do cliente a partir do PDF da HDI
   */
  parse(text: string, fileName: string): Partial<IClient> {
    const clientData = this.createBaseClientData();

    // Extrair nome do arquivo primeiro (fallback)
    const nameFromFile = this.extractNameFromFileName(fileName);
    if (nameFromFile) {
      clientData.details!.name = nameFromFile;
    }

    // Extrair dados pessoais
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
    // Extrair Nome de Registro do Segurado (HDI usa "Nome de Registro do Segurado")
    if (!clientData.details!.name) {
      const namePatterns = [
        /Nome de Registro do Segurado[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|RG|$)/i,
        /Nome Social do Segurado[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+Nome de Registro|CPF|$)/i,
        /Nome[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ][A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CPF|RG|$)/i,
      ];

      for (const pattern of namePatterns) {
        const match = text.match(pattern);
        if (match && match[1] && match[1].trim()) {
          clientData.details!.name = match[1].trim().replace(/\s+/g, " ");
          break;
        }
      }
    }

    // Extrair CPF
    const cpfPatterns = [/CPF[:\s]+(\d{3}\.\d{3}\.\d{3}-\d{2})/i, /CPF[:\s]+(\d{11})/i];

    for (const pattern of cpfPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        clientData.details!.cpf = match[1].replace(/[^\d]/g, "");
        break;
      }
    }

    // Extrair RG
    const rgPattern = /RG[:\s]+(\d{1,2}\.?\d{3}\.?\d{3}-?\d{0,2})/i;
    const rgMatch = text.match(rgPattern);
    if (rgMatch && rgMatch[1]) {
      clientData.details!.rg = rgMatch[1].trim();
    }

    // Extrair Data de nascimento (se disponível)
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
    // Endereço (HDI usa "Endereço:" sem prefixo de seção)
    const addressPatterns = [
      /Endereço[:\s]+([A-Z0-9ÁÉÍÓÚÂÊÔÇ\s,]+?)(?:\s+Bairro|CEP|Cidade|Celular|$)/i,
      /Endereço[:\s]+(.+?)(?:\s+Bairro)/i,
    ];

    for (const pattern of addressPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const fullAddress = match[1].trim();
        // Separar endereço e número (ex: "Rua Ribeiro Baiao, 80")
        const addressParts = fullAddress.match(/^(.+?)[,\s]+(\d+)\s*(.*)$/);
        if (addressParts) {
          clientData.address!.address = addressParts[1].replace(/,/g, "").trim();
          clientData.address!.number = addressParts[2].trim();
          clientData.address!.complement = addressParts[3]?.trim() || "";
        } else {
          clientData.address!.address = fullAddress.replace(/,/g, "").trim();
        }
        break;
      }
    }

    // Bairro
    const bairroPatterns = [
      /Bairro[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s()]+?)(?:\s+CEP|Cidade|Celular|$)/i,
      /Bairro[:\s]+(.+?)(?:\s+Cidade)/i,
    ];

    for (const pattern of bairroPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const bairro = match[1].trim();
        if (clientData.address!.complement) {
          clientData.address!.complement += ` - ${bairro}`;
        } else {
          clientData.address!.complement = bairro;
        }
        break;
      }
    }

    // Cidade (HDI usa formato "Sao Paulo - SP")
    const cidadePatterns = [
      /Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)\s*-\s*([A-Z]{2})/i,
      /Cidade[:\s]+([A-ZÁÉÍÓÚÂÊÔÇ\s]+?)(?:\s+CEP|$)/i,
    ];

    for (const pattern of cidadePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        clientData.address!.city = match[1].trim();
        // Se tiver UF no mesmo campo
        if (match[2]) {
          clientData.address!.state = match[2].trim();
        }
        break;
      }
    }

    // CEP
    const cepPattern = /CEP[:\s]+(\d{5}-?\d{3})/i;
    const cepMatch = text.match(cepPattern);
    if (cepMatch && cepMatch[1]) {
      clientData.address!.zipcode = cepMatch[1].replace(/[^\d-]/g, "");
    }

    // UF (se não foi extraída junto com cidade)
    if (!clientData.address!.state) {
      const ufPattern =
        /\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i;
      const ufMatch = text.match(ufPattern);
      if (ufMatch && ufMatch[1]) {
        clientData.address!.state = ufMatch[1].toUpperCase();
      }
    }
  }

  /**
   * Extrai dados de contato
   */
  private extractContactData(text: string, clientData: Partial<IClient>): void {
    // Telefone Celular (HDI usa "Celular:")
    const phonePatterns = [
      /Celular[:\s]+\(?(\d{2})\)?\s*(\d{4,5}-?\d{4})/i,
      /Celular[:\s]+(\d{10,11})/i,
      /Telefone[:\s]+\(?(\d{2})\)?\s*(\d{4,5}-?\d{4})/i,
    ];

    for (const pattern of phonePatterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[1] && match[2]) {
          // Formato: (XX) XXXX-XXXX
          clientData.details!.phone = `${match[1]}${match[2].replace(/[^\d]/g, "")}`;
        } else if (match[1]) {
          // Formato: XXXXXXXXXXX
          clientData.details!.phone = match[1].replace(/[^\d]/g, "");
        }
        if (clientData.details!.phone) {
          break;
        }
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
    // Extrair número da apólice (HDI usa formato "01.135.431.136063")
    const apolicePatterns = [/Apólice[:\s]+(\d{2}\.\d{3}\.\d{3}\.\d{6})/i, /Apólice[:\s]+(\d+)/i];

    let apoliceNumber = "";

    for (const pattern of apolicePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        apoliceNumber = match[1].trim();
        break;
      }
    }

    let product: IProduct;

    if (apoliceNumber) {
      product = this.createProductFromApoliceNumber(apoliceNumber, clientData.details?.name || "");

      // Extrair datas de vigência (HDI usa formato "das 24h do dia DD/MM/YYYY às 24h do dia DD/MM/YYYY")
      const vigenciaPatterns = [
        /Vigência[:\s]+das 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?às 24h do dia[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
        /Vigência[:\s]+(\d{2}\/\d{2}\/\d{4})[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i,
      ];

      for (const pattern of vigenciaPatterns) {
        const match = text.match(pattern);
        if (match && match[1] && match[2]) {
          product.start = match[1].trim();
          product.end = match[2].trim();
          break;
        }
      }

      // Extrair valor do prêmio (HDI usa "Prêmio Total:")
      const premioPatterns = [/Prêmio Total[:\s]+([\d.,]+)/i, /Prêmio total[:\s]+([\d.,]+)/i];

      for (const pattern of premioPatterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          const valorStr = match[1].replace(/\./g, "").replace(",", ".");
          const valor = parseFloat(valorStr);
          if (!isNaN(valor)) {
            product.price = valor;
          }
          break;
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
