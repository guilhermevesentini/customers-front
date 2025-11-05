/**
 * Funções utilitárias para normalizar dados extraídos dos PDFs
 * Segue princípios de Clean Code: funções puras, responsabilidade única
 */

/**
 * Remove caracteres não numéricos de uma string
 */
export function removeNonDigits(value: string): string {
  return value.replace(/[^\d]/g, "");
}

/**
 * Normaliza CPF removendo formatação
 * @example "125.128.798-01" -> "12512879801"
 */
export function normalizeCpf(cpf: string): string {
  return removeNonDigits(cpf);
}

/**
 * Normaliza telefone removendo formatação e zero inicial do DDD
 * @example "(011)976421351" -> "11976421351"
 * @example "011976421351" -> "11976421351"
 */
export function normalizePhone(phone: string): string {
  let normalized = removeNonDigits(phone);

  // Remover zero inicial se tiver 11 dígitos e começar com 0
  if (normalized.length === 11 && normalized.startsWith("0")) {
    normalized = normalized.substring(1);
  }

  return normalized;
}

/**
 * Normaliza telefone a partir de DDD e número separados
 * Remove zero inicial do DDD se tiver 3 dígitos
 */
export function normalizePhoneFromParts(ddd: string, number: string): string {
  let normalizedDdd = removeNonDigits(ddd);
  const normalizedNumber = removeNonDigits(number);

  // Remover zero inicial do DDD se tiver 3 dígitos (ex: 011 -> 11)
  if (normalizedDdd.length === 3 && normalizedDdd.startsWith("0")) {
    normalizedDdd = normalizedDdd.substring(1);
  }

  return `${normalizedDdd}${normalizedNumber}`;
}

/**
 * Normaliza valor monetário brasileiro
 * @example "1.652,21" -> 1652.21
 */
export function normalizeCurrency(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(normalized);
}

/**
 * Normaliza nome removendo espaços extras e capitalizando
 */
export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

/**
 * Normaliza CEP mantendo apenas números e hífen
 */
export function normalizeCep(cep: string): string {
  return cep.replace(/[^\d-]/g, "");
}

/**
 * Normaliza endereço removendo vírgulas desnecessárias
 */
export function normalizeAddress(address: string): string {
  return address.replace(/,/g, "").trim();
}

/**
 * Normaliza data de DD/MM/YYYY para ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @example "16/04/1969" -> "1969-04-16T03:00:00.000Z"
 */
export function normalizeDateToISO(dateStr: string): string {
  if (!dateStr) return "";

  // Remove espaços e valida formato DD/MM/YYYY
  const cleanDate = dateStr.trim().replace(/\s+/g, "");

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(cleanDate)) {
    return "";
  }

  // Extrai dia, mês e ano
  const [day, month, year] = cleanDate.split("/");

  // Cria objeto Date (mês é 0-indexed, então subtrai 1)
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return "";
  }

  // Retorna em formato ISO
  return date.toISOString();
}
