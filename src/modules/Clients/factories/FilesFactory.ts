import type { IFiles } from "../@types/types";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const createFiles = (data: Partial<IFiles>[] = []): IFiles[] => {
  validateFiles(data);

  return data.map((doc) => ({
    size: doc.size ?? 0,
    content: doc.content ?? "",
    name: doc.name ?? "",
    type: doc.type ?? "",
  }));
};

function validateFiles(data: Partial<IFiles>[]) {
  for (const file of data) {
    if (file.size && file.size > MAX_SIZE) {
      throw new Error("Arquivo maior que 5MB");
    }
  }
}
