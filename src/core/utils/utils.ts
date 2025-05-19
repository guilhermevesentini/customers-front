<<<<<<< HEAD
import { Mask } from "maska";

export function formatDateToBr(dateStr: string | Date): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}

export const phoneMask = { mask: ["(##) ####-####", "(##) #####-####"] };
export const cpfMask = { mask: ["###.###.###-##"] };
export const zipCodeMask = { mask: ["#####-###"] };
export const currencyMask = { mask: ["#.##0,00"] };

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  return true;
=======
import { Mask } from 'maska';

export function formatDateToBr(dateStr: string | Date): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR')
}

export const phoneMask = { mask: ['(##) ####-####', '(##) #####-####'] };
export const cpfMask = { mask: ['###.###.###-##'] };
export const zipCodeMask = { mask: ['#####-###'] };
export const currencyMask = { mask: ['#.##0,00'] };

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  
  return true
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
}

export const formatCpf = (cpf: string) => {
  const maskInstance = new Mask(cpfMask);
  return maskInstance.masked(cpf);
};

export const formatCurrency = (value: string) => {
  const maskInstance = new Mask(currencyMask);
  return maskInstance.masked(value);
};

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
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
=======
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(',')[1]) // decodifica base64 removendo o prefixo data:mime/type;base64,
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: mimeType })
}

export const getTextFromOptions = (options: { title: string; value: string }[], value: string | undefined) => {
  const found = options.find(opt => opt.value === value)
  return found ? found.title : value
}


>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
