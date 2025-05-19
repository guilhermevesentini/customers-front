import type { EStatus } from "@/shared/enums/enums"

export interface IClientPageTable {
  name: string
  status: EStatus | string
  id: string
  apolices: number
} 