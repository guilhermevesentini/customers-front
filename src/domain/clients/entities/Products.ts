<<<<<<< HEAD
import { Files } from "@/domain/shared/Document/Document";
import type { IProduct } from "@/modules/Clients/interfaces/IProducts";
=======
import { Files } from '@/domain/shared/Document/Document';
import type { IProduct } from '@/modules/Clients/interfaces/IProducts';
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

export class Products {
  private _data: IProduct;

  constructor(data?: IProduct) {
<<<<<<< HEAD
    if (data) this.validate(data);

    this._data = {
      status: data?.status ?? "",
      tipo: data?.tipo ?? "",
      company: data?.company ?? "",
      description: data?.description ?? "",
      end: data?.end ?? "",
      start: data?.start ?? "",
      price: data?.price ?? 0,
      files: data?.files || new Files().getFiles,
=======
    if(data) this.validate(data);

    this._data = {
      status: data?.status ?? '',
      tipo: data?.tipo ?? '',
      company: data?.company ?? '',
      description: data?.description ?? '',
      end: data?.end ?? '',
      start: data?.start ?? '',
      price: data?.price ?? 0,
      files: data?.files || new Files().getFiles
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    };
  }

  private validate(data: IProduct) {
<<<<<<< HEAD
    if (!data.tipo) throw new Error("Tipo é obrigatório");
  }

  get getProducts(): IProduct {
    return this._data;
  }
}
=======
    if (!data.tipo) throw new Error('Tipo é obrigatório');
  }

  get getProducts(): IProduct {
    return this._data
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
