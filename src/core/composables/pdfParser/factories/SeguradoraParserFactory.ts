import type { ISeguradoraParser } from "../interfaces/ISeguradoraParser";
import { MapfreParser } from "../parsers/mapfre/MapfreParser";
import { HdiParser } from "../parsers/hdi/HdiParser";

/**
 * Factory Pattern: Cria e retorna o parser adequado para cada seguradora
 * Open/Closed Principle: Fácil adicionar novas seguradoras sem modificar código existente
 */
export class SeguradoraParserFactory {
  private static parsers: ISeguradoraParser[] = [
    new MapfreParser(),
    new HdiParser(),
    // Adicionar novas seguradoras aqui:
    // new PortoSeguroParser(),
    // new BradescoParser(),
    // etc...
  ];

  /**
   * Retorna o parser adequado para o PDF fornecido
   * @param text Texto extraído do PDF
   * @param fileName Nome do arquivo PDF
   * @returns Parser adequado ou null se nenhum parser conseguir identificar
   */
  static getParser(text: string, fileName: string): ISeguradoraParser | null {
    for (const parser of this.parsers) {
      if (parser.canParse(text, fileName)) {
        return parser;
      }
    }

    // Nenhum parser identificou a seguradora
    return null;
  }

  /**
   * Registra um novo parser de seguradora
   * Útil para adicionar parsers dinamicamente
   */
  static registerParser(parser: ISeguradoraParser): void {
    this.parsers.push(parser);
  }

  /**
   * Retorna todos os parsers registrados
   */
  static getAllParsers(): ISeguradoraParser[] {
    return [...this.parsers];
  }
}
