<<<<<<< HEAD
import type { IClient } from "../../interfaces/IClient";

export interface IClientsRepository {
  getAll(): Promise<IClient[]>;
  getById(id: string): Promise<IClient | undefined>;
  create(client: IClient): Promise<void>;
  update(id: string, client: IClient): Promise<IClient | null>;
  delete(id: string): Promise<void>;
=======
import type { IClient } from "../../interfaces/IClient"

export interface IClientsRepository {
  getAll(): Promise<IClient[]>
  getById(id: string): Promise<IClient | undefined>
  create(client: IClient): Promise<void>
  update(id: string, client: IClient): Promise<IClient | null>
  delete(id: string): Promise<void>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
}
