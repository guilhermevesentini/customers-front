import type { IClient } from "@/modules/Clients/@types/types";

/**
 * Interface para parsers de seguradoras
 * Strategy Pattern: cada seguradora implementa sua própria estratégia de parsing
 */
export interface ISeguradoraParser {
  /**
   * Identifica se o PDF pertence a esta seguradora
   */
  canParse(text: string, fileName: string): boolean;

  /**
   * Extrai dados do cliente a partir do texto do PDF
   */
  parse(text: string, fileName: string): Partial<IClient>;
}
