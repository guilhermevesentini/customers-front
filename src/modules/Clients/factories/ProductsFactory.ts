import type { IProduct } from "@/modules/Clients/@types/types";
import { createFiles } from "./FilesFactory";

export const createProductData = (data?: IProduct): IProduct => {
  if (data && !data.tipo) {
    throw new Error("Tipo é obrigatório");
  }

  return {
    status: data?.status ?? "",
    tipo: data?.tipo ?? "",
    company: data?.company ?? "",
    description: data?.description ?? "",
    end: data?.end ?? "",
    start: data?.start ?? "",
    price: data?.price ?? 0,
    files: data?.files || createFiles(),
  };
};
