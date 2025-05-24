import type { EStatus } from "@/core/enums/enums";

export interface IClientPageTable {
  name: string;
  status: EStatus | string;
  id: string;
  apolices: number;
}
