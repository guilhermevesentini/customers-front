import type { IFiles } from "@/modules/Clients/@types/types";
import { Mask } from "maska";

export function formatDateToBr(dateStr: string | Date): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}

export function formatToBRL(value: number): string {
  console.log(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export const phoneMask = { mask: ["(##) ####-####", "(##) #####-####"] };
export const cpfMask = { mask: ["###.###.###-##"] };
export const zipCodeMask = { mask: ["#####-###"] };
export const currencyMask = { mask: ["#.##0,00"] };

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  return true;
}

export const formatCpf = (cpf: string) => {
  const maskInstance = new Mask(cpfMask);
  return maskInstance.masked(cpf);
};

export const formatPhone = (phone: string) => {
  const maskInstance = new Mask(phoneMask);
  return maskInstance.masked(phone);
};

export const formatCurrency = (value: string) => {
  const maskInstance = new Mask(currencyMask);
  return maskInstance.masked(value);
};

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(",")[1]); // decodifica base64 removendo o prefixo data:mime/type;base64,
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: mimeType });
};

export const getTextFromOptions = (
  options: { title: string; value: string }[],
  value: string | undefined,
) => {
  const found = options.find((opt) => opt.value === value);
  return found ? found.title : value;
};

export const openFile = (file: IFiles | undefined) => {
  if (!file) return;
  const blob = base64ToBlob(file.content, file.type);
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL, "_blank");
  setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
};

export const downloadFile = (file: IFiles | undefined) => {
  if (!file) return;
  const blob = base64ToBlob(file.content, file.type);
  const fileURL = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(fileURL);
};
