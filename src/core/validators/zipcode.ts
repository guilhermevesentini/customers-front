export function isValidZipcode(value: string): boolean {
  return /^\d{5}-?\d{3}$/.test(value);
}
