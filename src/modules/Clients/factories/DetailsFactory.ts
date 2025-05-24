import { EStatus } from "@/core/enums/enums";
import type { IDetails } from "../@types/types";

export const createDetails = (data: Partial<IDetails> = {}): IDetails => {
  //validate(data);

  return {
    name: data.name ?? "",
    email: data.email ?? "",
    status: data.status ?? EStatus.pending,
    phone: data.phone ?? "",
    birthday: data.birthday ?? "",
    rg: data.rg ?? "",
    cpf: data.cpf ?? "",
  };
};

function validate(data: Partial<IDetails>) {
  if (!data.name) throw new Error("Nome é obrigatório");

  const cleanedCpf = data.cpf?.replace(/[^\d]/g, "");
  if (cleanedCpf && !cleanedCpf.match(/^\d{11}$/)) {
    throw new Error("CPF inválido");
  }
}
