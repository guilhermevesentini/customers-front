import type { IClient, IProduct } from "@/modules/Clients/@types/types";
import { BaseSeguradoraParser } from "../../base/BaseSeguradoraParser";
import { companiesOpt, EStatus } from "@/core/enums/enums";
import { createProductData } from "@/modules/Clients/factories/ProductsFactory";
import { MapfrePatterns } from "../../utils/Patterns";
import {
  PersonalDataExtractor,
  AddressDataExtractor,
  ContactDataExtractor,
  ProductDataExtractor,
} from "../../utils/PatternExtractors";
import { CommonPatterns } from "../../utils/Patterns";
import { normalizeDateToISO } from "../../utils/DataNormalizers";

/**
 * Parser específico para documentos da Mapfre Seguros
 * Implementa a estratégia de parsing para o formato específico da Mapfre
 * Usa classes de extração reutilizáveis para manter código limpo
 */
export class MapfreParser extends BaseSeguradoraParser {
  private personalExtractor = new PersonalDataExtractor();
  private addressExtractor = new AddressDataExtractor();
  private contactExtractor = new ContactDataExtractor();
  private productExtractor = new ProductDataExtractor();

  /**
   * Identifica se o PDF é da Mapfre
   */
  canParse(text: string, fileName: string): boolean {
    return MapfrePatterns.indicators.some((pattern) => pattern.test(text));
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
    // Extrair Nome (dentro da seção DADOS DO SEGURADO)
    if (!clientData.details!.name || text.includes("DADOS DO SEGURADO")) {
      const name = this.personalExtractor.extractName(text, [MapfrePatterns.name]);
      if (name) {
        clientData.details!.name = name;
      }
    }

    // Extrair CPF (dentro da seção DADOS DO SEGURADO)
    const cpf = this.personalExtractor.extractCpf(text, [MapfrePatterns.cpf]);
    if (cpf && !clientData.details!.cpf) {
      clientData.details!.cpf = cpf;
    }

    // Extrair Data de nascimento
    const birthday = this.personalExtractor.extractBirthday(text, MapfrePatterns.birthdayPatterns);
    if (birthday && !clientData.details!.birthday) {
      const isoDate = normalizeDateToISO(birthday);
      if (isoDate) {
        clientData.details!.birthday = isoDate;
      }
    }
  }

  /**
   * Extrai dados de endereço
   */
  private extractAddressData(text: string, clientData: Partial<IClient>): void {
    // Endereço (dentro da seção DADOS DO SEGURADO)
    const addressMatch = text.match(MapfrePatterns.address);
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

    // Bairro (dentro da seção DADOS DO SEGURADO)
    const bairroMatch = text.match(MapfrePatterns.bairro);
    if (bairroMatch && bairroMatch[1] && !clientData.address!.complement) {
      const bairro = bairroMatch[1].trim();
      if (clientData.address!.complement) {
        clientData.address!.complement += ` - ${bairro}`;
      } else {
        clientData.address!.complement = bairro;
      }
    }

    // Cidade (dentro da seção DADOS DO SEGURADO)
    const cidadeMatch = text.match(MapfrePatterns.cidade);
    if (cidadeMatch && cidadeMatch[1] && !clientData.address!.city) {
      clientData.address!.city = cidadeMatch[1].trim();
    }

    // CEP (dentro da seção DADOS DO SEGURADO)
    this.addressExtractor.extractCep(text, MapfrePatterns.cep, clientData);

    // UF (dentro da seção DADOS DO SEGURADO)
    const ufMatch = text.match(MapfrePatterns.uf);
    if (ufMatch && ufMatch[1] && !clientData.address!.state) {
      clientData.address!.state = ufMatch[1].trim();
    }
  }

  /**
   * Extrai dados de contato
   */
  private extractContactData(text: string, clientData: Partial<IClient>): void {
    // Telefones (priorizar celular)
    this.contactExtractor.extractPhone(text, MapfrePatterns.phone, clientData);

    // Email
    this.contactExtractor.extractEmail(text, CommonPatterns.email, clientData);
  }

  /**
   * Extrai dados do produto/apólice
   */
  private extractProductData(text: string, fileName: string, clientData: Partial<IClient>): void {
    // Extrair número da apólice
    const apoliceNumber = this.productExtractor.extractApoliceNumber(text, [
      MapfrePatterns.apolice,
    ]);

    let product: IProduct;

    const companyId =
      companiesOpt.find((company) => company.title.includes("MAPFRE"))?.value || "0";

    if (apoliceNumber) {
      product = this.createProductFromApoliceNumber(
        apoliceNumber,
        clientData.details?.name || "",
        companyId,
      );

      // Extrair datas de vigência
      const [start, end] = this.productExtractor.extractVigencia(text, [MapfrePatterns.vigencia]);
      if (start && end) {
        const isoStart = normalizeDateToISO(start);
        const isoEnd = normalizeDateToISO(end);
        if (isoStart && isoEnd) {
          product.start = isoStart;
          product.end = isoEnd;
        }
      }

      // Extrair valor do prêmio
      const premio = this.productExtractor.extractPremio(text, [MapfrePatterns.premio]);
      if (premio !== null) {
        product.price = premio;
      }
    } else {
      // Fallback: usar nome do arquivo
      const fileNameMatch = fileName.match(/Apolice_([^_]+)_(.+)\.pdf/i);
      if (fileNameMatch && fileNameMatch[1]) {
        product = this.createProductFromApoliceNumber(
          fileNameMatch[1],
          clientData.details?.name || "",
          companyId,
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
