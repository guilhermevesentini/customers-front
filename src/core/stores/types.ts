import type { IClient, IProduct } from "@/modules/Clients/@types/types";

export type IAppStore = {
  loading: boolean;
  clients: IClient[];
};

export type IApolicesList = Partial<IProduct & { id: string }>[];
