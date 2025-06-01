import type { IProduct } from "@/modules/Clients/@types/types";
import { createFiles } from "./FilesFactory";
import { v4 as uuidv4 } from "uuid";

export const createProductData = (data?: IProduct, clientName?: string): IProduct => {
  if (data && !data.tipo) {
    throw new Error("Tipo é obrigatório");
  }

  return {
    id: data?.id === "" || data?.id === undefined ? uuidv4() : data.id,
    status: data?.status ?? "",
    tipo: data?.tipo ?? "",
    company: data?.company ?? "",
    description: clientName ?? "",
    end: data?.end ?? "",
    start: data?.start ?? "",
    price: data?.price ?? 0,
    files: data?.files || createFiles(),
  };
};
