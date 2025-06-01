import type { IClient, IProduct } from "../../@types/types";

export interface IClientsRepository {
  getAll(): Promise<IClient[]>;
  getById(id: string): Promise<IClient | undefined>;
  create(client: IClient): Promise<void>;
  update(id: string, client: IClient): Promise<IClient | null>;
  delete(id: string): Promise<void>;
  renovarProduto(id: string, produto: IProduct): Promise<IProduct | null>;
}
