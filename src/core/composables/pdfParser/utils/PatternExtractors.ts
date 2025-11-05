import type { IClient } from "@/modules/Clients/@types/types";

import {
  normalizeCpf,
  normalizePhone,
  normalizePhoneFromParts,
  normalizeCurrency,
  normalizeName,
  normalizeCep,
  normalizeAddress,
} from "./DataNormalizers";

/**
 * Classe base para extrair dados usando padrões regex
 * Segue princípios de Clean Code: Single Responsibility, DRY
 */
export class PatternExtractor {
  /**
   * Extrai valor usando um padrão regex
   * Retorna o primeiro match encontrado
   */
  public extractSingle(text: string, pattern: RegExp): string | null {
    const match = text.match(pattern);
    return match && match[1] ? match[1].trim() : null;
  }

  /**
   * Extrai valor usando múltiplos padrões
   * Retorna o primeiro match encontrado de qualquer padrão
   */
  protected extractMultiple(text: string, patterns: readonly RegExp[] | RegExp[]): string | null {
    for (const pattern of patterns) {
      const result = this.extractSingle(text, pattern);
      if (result) {
        return result;
      }
    }
    return null;
  }

  /**
   * Extrai dois valores usando um padrão regex
   * Útil para padrões que capturam dois grupos
   */
  protected extractPair(text: string, pattern: RegExp): [string | null, string | null] {
    const match = text.match(pattern);
    if (match && match[1] && match[2]) {
      return [match[1].trim(), match[2].trim()];
    }
    return [null, null];
  }
}

/**
 * Extrator de dados pessoais (nome, CPF, RG, data de nascimento)
 */
export class PersonalDataExtractor extends PatternExtractor {
  /**
   * Extrai nome usando padrões específicos
   */
  extractName(text: string, patterns: readonly RegExp[] | RegExp[]): string | null {
    const name = this.extractMultiple(text, patterns);
    return name ? normalizeName(name) : null;
  }

  /**
   * Extrai e normaliza CPF
   */
  extractCpf(text: string, patterns: readonly RegExp[] | RegExp[]): string | null {
    const cpf = this.extractMultiple(text, patterns);
    return cpf ? normalizeCpf(cpf) : null;
  }

  /**
   * Extrai RG
   */
  extractRg(text: string, pattern: RegExp): string | null {
    return this.extractSingle(text, pattern);
  }

  /**
   * Extrai data de nascimento
   */
  extractBirthday(text: string, pattern: RegExp): string | null {
    return this.extractSingle(text, pattern);
  }
}

/**
 * Extrator de dados de endereço
 */
export class AddressDataExtractor extends PatternExtractor {
  /**
   * Extrai e separa endereço completo (endereço, número, complemento)
   */
  extractAddress(
    text: string,
    patterns: readonly RegExp[] | RegExp[],
    clientData: Partial<IClient>,
  ): void {
    const fullAddress = this.extractMultiple(text, patterns);
    if (!fullAddress) return;

    const normalized = normalizeAddress(fullAddress);

    // Tentar separar endereço e número (ex: "Rua Ribeiro Baiao, 80" ou "Rua X 123")
    const addressParts = normalized.match(/^(.+?)[,\s]+(\d+)\s*(.*)$/);

    if (addressParts) {
      clientData.address!.address = addressParts[1].trim();
      clientData.address!.number = addressParts[2].trim();
      clientData.address!.complement = addressParts[3]?.trim() || "";
    } else {
      clientData.address!.address = normalized;
    }
  }

  /**
   * Extrai bairro
   */
  extractBairro(
    text: string,
    patterns: readonly RegExp[] | RegExp[],
    clientData: Partial<IClient>,
  ): void {
    const bairro = this.extractMultiple(text, patterns);
    if (!bairro) return;

    const normalized = normalizeName(bairro);
    if (clientData.address!.complement) {
      clientData.address!.complement += ` - ${normalized}`;
    } else {
      clientData.address!.complement = normalized;
    }
  }

  /**
   * Extrai cidade e UF (pode vir juntos ou separados)
   */
  extractCidade(
    text: string,
    patterns: readonly RegExp[] | RegExp[],
    clientData: Partial<IClient>,
  ): void {
    for (const pattern of patterns) {
      const [cidade, uf] = this.extractPair(text, pattern);
      if (cidade) {
        clientData.address!.city = normalizeName(cidade);
        if (uf) {
          clientData.address!.state = uf.toUpperCase();
        }
        break;
      }
    }
  }

  /**
   * Extrai CEP
   */
  extractCep(text: string, pattern: RegExp, clientData: Partial<IClient>): void {
    const cep = this.extractSingle(text, pattern);
    if (cep) {
      clientData.address!.zipcode = normalizeCep(cep);
    }
  }

  /**
   * Extrai UF (se não foi extraída junto com cidade)
   */
  extractUf(text: string, pattern: RegExp, clientData: Partial<IClient>): void {
    if (!clientData.address!.state) {
      const uf = this.extractSingle(text, pattern);
      if (uf) {
        clientData.address!.state = uf.toUpperCase();
      }
    }
  }
}

/**
 * Extrator de dados de contato (telefone, email)
 */
export class ContactDataExtractor extends PatternExtractor {
  /**
   * Extrai e normaliza telefone
   * Suporta formatos com DDD separado ou tudo junto
   */
  extractPhone(
    text: string,
    patterns: readonly RegExp[] | RegExp[],
    clientData: Partial<IClient>,
  ): void {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[1] && match[2]) {
          // Formato com DDD e número separados: (XX) XXXX-XXXX ou (XX)XXXXXXXX
          const phone = normalizePhoneFromParts(match[1], match[2]);
          if (phone.length >= 10) {
            clientData.details!.phone = phone;
            break;
          }
        } else if (match[1]) {
          // Formato: XXXXXXXXXXX (tudo junto)
          const phone = normalizePhone(match[1]);
          if (phone.length >= 10) {
            clientData.details!.phone = phone;
            break;
          }
        }
      }
    }
  }

  /**
   * Extrai email
   */
  extractEmail(text: string, pattern: RegExp, clientData: Partial<IClient>): void {
    const email = this.extractSingle(text, pattern);
    if (email) {
      clientData.details!.email = email.trim();
    }
  }
}

/**
 * Extrator de dados do produto/apólice
 */
export class ProductDataExtractor extends PatternExtractor {
  /**
   * Extrai número da apólice
   */
  extractApoliceNumber(text: string, patterns: readonly RegExp[] | RegExp[]): string | null {
    return this.extractMultiple(text, patterns);
  }

  /**
   * Extrai datas de vigência (início e fim)
   */
  extractVigencia(
    text: string,
    patterns: readonly RegExp[] | RegExp[],
  ): [string | null, string | null] {
    for (const pattern of patterns) {
      const [start, end] = this.extractPair(text, pattern);
      if (start && end) {
        return [start, end];
      }
    }
    return [null, null];
  }

  /**
   * Extrai e normaliza valor do prêmio
   */
  extractPremio(text: string, patterns: readonly RegExp[] | RegExp[]): number | null {
    const premioStr = this.extractMultiple(text, patterns);
    if (!premioStr) return null;

    const valor = normalizeCurrency(premioStr);
    return isNaN(valor) ? null : valor;
  }
}
