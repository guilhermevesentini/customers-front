import { EStatus } from "@/core/enums/enums";
import type { IClientPageTable } from "../widgets/types";

const firstNames = [
  "Lucas",
  "Amanda",
  "Carlos",
  "Juliana",
  "Roberto",
  "Beatriz",
  "Fernando",
  "Patrícia",
  "Bruno",
  "Mariana",
];
const lastNames = [
  "Moreira",
  "Ribeiro",
  "Lima",
  "Silva",
  "Fernandes",
  "Rocha",
  "Souza",
  "Almeida",
  "Oliveira",
  "Martins",
];
const statuses = [EStatus.active, EStatus.pending, EStatus.inactive];

function generateClients(count: number): IClientPageTable[] {
  return [];

  const clients: IClientPageTable[] = [];

  for (let i = 0; i < count; i++) {
    const id = (100245 + i).toString();
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
    const status = statuses[i % statuses.length];
    const apolices = Math.floor(Math.random() * 5) + 1;

    clients.push({
      id,
      name,
      status,
      apolices,
    });
  }

  return clients;
}

export const clientsPageList: IClientPageTable[] = generateClients(50);
