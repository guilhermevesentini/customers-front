/**
 * PDF Parser Module
 *
 * Sistema modular para extração de dados de clientes a partir de PDFs de apólices.
 * Usa Strategy Pattern e Factory Pattern para suportar múltiplas seguradoras.
 */

export { extractTextFromPdf, parseClientInfoFromPdf, processPdfToClient } from "./PdfParser";
export { SeguradoraParserFactory } from "./factories/SeguradoraParserFactory";
export type { ISeguradoraParser } from "./interfaces/ISeguradoraParser";
export { BaseSeguradoraParser } from "./base/BaseSeguradoraParser";

// Exportar parsers específicos (se necessário para uso direto)
export { MapfreParser } from "./parsers/MapfreParser";
export { HdiParser } from "./parsers/HdiParser";
