import type { IFiles } from "@/domain/shared/Document/Document";

export type IProduct = {
  status: string;
  tipo: string;
  company: string;
  start: string;
  end: string;
  price: number;
  description: string;
  files: IFiles[];
};
