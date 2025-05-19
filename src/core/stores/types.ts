import type { IClient } from "@/modules/Clients/interfaces/IClient"
import type { IProduct } from "@/modules/Clients/interfaces/IProducts"

export type IAppStore = {
  loading: boolean
  clients: IClient[]
}

export type IApolicesList = Partial<IProduct & { id: string }>[]