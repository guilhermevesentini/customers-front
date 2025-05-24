import { isValidCPF } from "../utils/utils";

export const nameRules = [
  (value: string) => !!value || "Name é obrigatório",
  (value: string) => value.length > 5 || "Nome deve ter no mínimo 5 caracteres.",
];

export const emailRules = [
  (value: string) => !!value || "E-mail é obrigatório",
  (value: string) => /.+@.+\..+/.test(value) || "E-mail inválido.",
];

export const phoneRules = [
  (value: string) => !!value || "Telefone é obrigatório",
  (value: string) => /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(value) || "Telefone inválido.",
];

export const cpfRules = [
  (value: string) => !!value || "CPF é obrigatório",
  (value: string) => isValidCPF(value) || "CPF inválido.",
];

export const addressRules = [
  (value: string) => !!value || "Endereço é obrigatório",
  (value: string) => value.length > 5 || "Endereço deve ter no mínimo 5 caracteres.",
];

export const numberOnlyRules = [
  (value: string) => !!value || "Number é obrigatório",
  (value: string) => /^\d+$/.test(value) || "Número inválido.",
];

export const cityRules = [
  (value: string) => !!value || "Cidade é obrigatória",
  (value: string) => value.length > 3 || "Cidade deve ter no mínimo 3 caracteres.",
];

export const stateRules = [
  (value: string) => !!value || "Estado é obrigatório",
  (value: string) => value.length > 3 || "Estado deve ter no mínimo 3 caracteres.",
];

export const zipcodeRules = [
  (value: string) => !!value || "Cep é obrigatório",
  (value: string) => /^[0-9]{5}-?[0-9]{3}$/.test(value) || "CEP inválido.",
];

export const statusRules = [
  (value: string | null | undefined) => !!value || "Status é obrigatório",
];

export const tipoRules = [(value: string | null | undefined) => !!value || "Tipo é obrigatório"];

export const companyRules = [
  (value: string | null | undefined) => !!value || "Seguradora é obrigatório",
];

export const priceRules = [
  (value: string | null | undefined) =>
    (value !== null && value !== undefined && value !== "0") || "Preço é obrigatório",
  (value: string) => value > "0" || "Preço deve ser maior que 0.",
];

export const requiredDate = () => [
  (value: string | null | undefined) => !!value || `Início de vigência é obrigatório`,
];

export const startEndDateRules = (start: string | null, end: string | null) => [
  () => !!start || "Início de vigência é obrigatório.",
  () => !!end || "Fim de vigência é obrigatório.",
  () => {
    if (start && end) {
      return (
        new Date(end) >= new Date(start) || "Fim de vigência deve ser após início de vigência."
      );
    }
    return true;
  },
];
