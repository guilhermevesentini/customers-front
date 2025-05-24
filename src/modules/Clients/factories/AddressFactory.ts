import type { IAddress } from "../@types/types";

export const createAddress = (data?: Partial<IAddress>): IAddress => {
  //if (data) validateAddress(data);

  return {
    address: data?.address ?? "",
    city: data?.city ?? "",
    complement: data?.complement ?? "",
    number: data?.number ?? "",
    state: data?.state ?? "",
    zipcode: data?.zipcode ?? "",
  };
};

const validateAddress = (data: Partial<IAddress>) => {
  // Exemplo de validação, descomente se quiser usar:
  // if (!data.address || !data.city || !data.zipcode) {
  //   throw new Error("Endereço, cidade e CEP são obrigatórios.");
  // }
};
