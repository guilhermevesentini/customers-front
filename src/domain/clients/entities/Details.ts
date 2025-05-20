import { EStatus } from "@/shared/enums/enums";
import type { IDetails } from "@/modules/Clients/interfaces/IDetails";

export class Details {
  private _data: IDetails;

  constructor(data?: IDetails) {
    if (data) this.validate(data);

    this._data = {
      name: data?.name ?? "",
      email: data?.email ?? "",
      status: data?.status ?? EStatus.pending,
      phone: data?.phone ?? "",
      birthday: data?.birthday ?? "",
      rg: data?.rg ?? "",
      cpf: data?.cpf ?? "",
    };
  }

  private validate(data: IDetails) {
    if (!data.name) throw new Error("Nome é obrigatório");

    const cleanedCpf = data.cpf.replace(/[^\d]/g, "");
    if (!cleanedCpf.match(/^\d{11}$/)) {
      throw new Error("CPF inválido");
    }
  }

  // private statusClient(data: IDetails | undefined) {
  //   if (!data) return EStatus.inactive
  //   return EStatus.inactive
  // }

  get getDetails(): IDetails {
    return this._data;
  }
}
