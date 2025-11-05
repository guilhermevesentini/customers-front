import type { IClient, IProduct } from "@/modules/Clients/@types/types";
import { BaseSeguradoraParser } from "../../base/BaseSeguradoraParser";
import { companiesOpt, EStatus } from "@/core/enums/enums";
import { createProductData } from "@/modules/Clients/factories/ProductsFactory";
import { HdiPatterns } from "../../utils/Patterns";
import {
  PersonalDataExtractor,
  AddressDataExtractor,
  ContactDataExtractor,
  ProductDataExtractor,
} from "../../utils/PatternExtractors";
import { CommonPatterns } from "../../utils/Patterns";
import { normalizeDateToISO } from "../../utils/DataNormalizers";

/**
 * Parser específico para documentos da HDI Seguros
 * Implementa a estratégia de parsing para o formato específico da HDI
 * Usa classes de extração reutilizáveis para manter código limpo
 */
export class HdiParser extends BaseSeguradoraParser {
  private personalExtractor = new PersonalDataExtractor();
  private addressExtractor = new AddressDataExtractor();
  private contactExtractor = new ContactDataExtractor();
  private productExtractor = new ProductDataExtractor();

  /**
   * Identifica se o PDF é da HDI
   */
  canParse(text: string, fileName: string): boolean {
    return HdiPatterns.indicators.some((pattern) => pattern.test(text));
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

    // Extrair dados usando extractors reutilizáveis
    this.extractPersonalData(text, clientData);
    this.extractAddressData(text, clientData);
    this.extractContactData(text, clientData);
    this.extractProductData(text, fileName, clientData);

    return clientData;
  }

  /**
   * Extrai dados pessoais do segurado
   * Busca primeiro na seção principal, depois na seção do condutor (fallback)
   */
  private extractPersonalData(text: string, clientData: Partial<IClient>): void {
    // Extrair Nome (seção principal primeiro, depois seção do condutor)
    if (!clientData.details!.name) {
      let name = this.personalExtractor.extractName(text, HdiPatterns.name);

      // Se não encontrou na seção principal, buscar na seção do condutor
      if (!name) {
        name = this.personalExtractor.extractName(text, HdiPatterns.condutorName);
      }

      if (name) {
        clientData.details!.name = name;
      }
    }

    // Extrair CPF (seção principal primeiro, depois seção do condutor)
    if (!clientData.details!.cpf) {
      let cpf = this.personalExtractor.extractCpf(text, CommonPatterns.cpf);

      // Se não encontrou na seção principal, buscar na seção do condutor
      if (!cpf) {
        cpf = this.personalExtractor.extractCpf(text, HdiPatterns.condutorCpf);
      }

      if (cpf) {
        clientData.details!.cpf = cpf;
      }
    }

    // Extrair RG
    const rg = this.personalExtractor.extractRg(text, CommonPatterns.rg);
    if (rg && !clientData.details!.rg) {
      clientData.details!.rg = rg;
    }

    // Extrair Data de nascimento (seção principal primeiro, depois seção do condutor)
    if (!clientData.details!.birthday) {
      // Tentar primeiro na seção principal
      let birthday = this.personalExtractor.extractBirthday(text, CommonPatterns.birthday);

      // Se não encontrou na seção principal, buscar na seção do condutor
      if (!birthday) {
        // Tentar todos os padrões da seção do condutor
        const condutorPatterns = Array.isArray(HdiPatterns.condutorBirthday)
          ? [...HdiPatterns.condutorBirthday]
          : [HdiPatterns.condutorBirthday];

        for (const pattern of condutorPatterns) {
          birthday = this.personalExtractor.extractBirthday(text, pattern);
          if (birthday) {
            break;
          }
        }
      }

      // Validar e normalizar a data para ISO format
      if (birthday && !clientData.details!.birthday) {
        const isoDate = normalizeDateToISO(birthday);
        console.log("isoDate", isoDate);

        if (isoDate) {
          clientData.details!.birthday = isoDate;
        }
      }
    }
  }

  /**
   * Extrai dados de endereço
   */
  private extractAddressData(text: string, clientData: Partial<IClient>): void {
    // Endereço
    this.addressExtractor.extractAddress(text, [...HdiPatterns.address], clientData);

    // Bairro
    this.addressExtractor.extractBairro(text, [...HdiPatterns.bairro], clientData);

    // Cidade e UF
    this.addressExtractor.extractCidade(text, HdiPatterns.cidade, clientData);

    // CEP
    this.addressExtractor.extractCep(text, CommonPatterns.cep, clientData);

    // UF (se não foi extraída junto com cidade)
    this.addressExtractor.extractUf(text, CommonPatterns.uf, clientData);
  }

  /**
   * Extrai dados de contato
   */
  private extractContactData(text: string, clientData: Partial<IClient>): void {
    // Telefone/Celular
    this.contactExtractor.extractPhone(text, HdiPatterns.phone, clientData);

    // Email
    this.contactExtractor.extractEmail(text, CommonPatterns.email, clientData);
  }

  /**
   * Extrai dados do produto/apólice
   */
  private extractProductData(text: string, fileName: string, clientData: Partial<IClient>): void {
    // Extrair número da apólice
    const apoliceNumber = this.productExtractor.extractApoliceNumber(text, HdiPatterns.apolice);

    let product: IProduct | undefined;

    const companyId = companiesOpt.find((company) => company.title.includes("HDI"))?.value || "0";

    if (apoliceNumber) {
      product = this.createProductFromApoliceNumber(
        apoliceNumber,
        clientData.details?.name || "",
        companyId,
      );

      // Extrair datas de vigência
      const [start, end] = this.productExtractor.extractVigencia(text, HdiPatterns.vigencia);
      if (start && end) {
        const isoStart = normalizeDateToISO(start);
        const isoEnd = normalizeDateToISO(end);
        if (isoStart && isoEnd) {
          product.start = isoStart;
          product.end = isoEnd;
        }
      }

      // Extrair valor do prêmio
      const premio = this.productExtractor.extractPremio(text, HdiPatterns.premio);
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
      }
    }

    if (product) {
      clientData.products = [product];
    }
  }
}
