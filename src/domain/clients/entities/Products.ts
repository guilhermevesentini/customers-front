import { Files } from "@/domain/shared/Document/Document";
import type { IProduct } from "@/modules/Clients/interfaces/IProducts";

export class Products {
  private _data: IProduct;

  constructor(data?: IProduct) {
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
    };
  }

  private validate(data: IProduct) {
    if (!data.tipo) throw new Error("Tipo é obrigatório");
  }

  get getProducts(): IProduct {
    return this._data;
  }
}
