import { isValidCPF } from "../utils/utils";

export const nameRules = [
  (value: string) => !!value || "Name is required.",
  (value: string) => value.length > 5 || "Name must have at least 5 characters.",
];

export const emailRules = [
  (value: string) => !!value || "E-mail is required.",
  (value: string) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
];

export const phoneRules = [
  (value: string) => !!value || "Phone is required.",
  (value: string) =>
    /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(value) ||
    "Phone must be a valid format (e.g., (00) 00000-0000).",
];

export const cpfRules = [
  (value: string) => !!value || "CPF is required.",
  (value: string) => isValidCPF(value) || "CPF must be valid.",
];

export const addressRules = [
  (value: string) => !!value || "Address is required.",
  (value: string) => value.length > 5 || "Address must have at least 5 characters.",
];

export const numberOnlyRules = [
  (value: string) => !!value || "Number is required.",
  (value: string) => /^\d+$/.test(value) || "Number must be valid",
];

export const cityRules = [
  (value: string) => !!value || "City is required.",
  (value: string) => value.length > 3 || "City must have at least 3 characters.",
];

export const stateRules = [
  (value: string) => !!value || "State is required.",
  (value: string) => value.length > 3 || "State must have at least 3 characters.",
];

export const zipcodeRules = [
  (value: string) => !!value || "Zipcode is required.",
  (value: string) =>
    /^[0-9]{5}-?[0-9]{3}$/.test(value) || "Zipcode must be in the format 00000-000.",
];

export const statusRules = [(value: string | null | undefined) => !!value || "Status is required."];

export const tipoRules = [(value: string | null | undefined) => !!value || "Tipo is required."];

export const companyRules = [
  (value: string | null | undefined) => !!value || "Seguradora is required.",
];

export const priceRules = [
  (value: string | null | undefined) =>
    (value !== null && value !== undefined && value !== "0") || "Price is required.",
  (value: string) => value > "0" || "Price must be greater than 0.",
];

export const requiredDate = (label = "Date") => [
  (value: string | null | undefined) => !!value || `${label} is required.`,
];

export const startEndDateRules = (start: string | null, end: string | null) => [
  () => !!start || "Start date is required.",
  () => !!end || "End date is required.",
  () => {
    if (start && end) {
      return new Date(end) >= new Date(start) || "End date must be after start date.";
    }
    return true;
  },
];
