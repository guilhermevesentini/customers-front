<<<<<<< HEAD
import type { IClient } from "@/modules/Clients/interfaces/IClient";
import type { IProduct } from "@/modules/Clients/interfaces/IProducts";

export type IAppStore = {
  loading: boolean;
  clients: IClient[];
};

export type IApolicesList = Partial<IProduct & { id: string }>[];
=======
import type { IClient } from "@/modules/Clients/interfaces/IClient"
import type { IProduct } from "@/modules/Clients/interfaces/IProducts"

export type IAppStore = {
  loading: boolean
  clients: IClient[]
}

export type IApolicesList = Partial<IProduct & { id: string }>[]
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
