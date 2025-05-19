<<<<<<< HEAD
import { EStatus } from "@/shared/enums/enums";
import type { IDetails } from "@/modules/Clients/interfaces/IDetails";
=======
import { EStatus } from '@/shared/enums/enums';
import type { IDetails } from '@/modules/Clients/interfaces/IDetails';
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

export class Details {
  private _data: IDetails;

  constructor(data?: IDetails) {
<<<<<<< HEAD
    if (data) this.validate(data);

    this._data = {
      name: data?.name ?? "",
      email: data?.email ?? "",
      status: data?.status ?? EStatus.pending,
      phone: data?.phone ?? "",
      birthday: data?.birthday ?? "",
      rg: data?.rg ?? "",
      cpf: data?.cpf ?? "",
=======
    if (data) this.validate(data);    

    this._data = {  
      name: data?.name ?? '',
      email: data?.email ?? '',
      status: data?.status ?? EStatus.pending,
      phone: data?.phone ?? '',
      birthday: data?.birthday ?? '',
      rg: data?.rg ?? '',
      cpf: data?.cpf ?? '',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    };
  }

  private validate(data: IDetails) {
<<<<<<< HEAD
    if (!data.name) throw new Error("Nome é obrigatório");

    const cleanedCpf = data.cpf.replace(/[^\d]/g, "");
    if (!cleanedCpf.match(/^\d{11}$/)) {
      throw new Error("CPF inválido");
=======
    if (!data.name) throw new Error('Nome é obrigatório');

    const cleanedCpf = data.cpf.replace(/[^\d]/g, '');
    if (!cleanedCpf.match(/^\d{11}$/)) {
      throw new Error('CPF inválido');
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    }
  }

  // private statusClient(data: IDetails | undefined) {
  //   if (!data) return EStatus.inactive
<<<<<<< HEAD

=======
    
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  //   return EStatus.inactive
  // }

  get getDetails(): IDetails {
<<<<<<< HEAD
    return this._data;
  }
}
=======
    return this._data
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
