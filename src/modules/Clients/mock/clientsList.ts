import { EStatus } from "@/shared/enums/enums";
import type { IClientPageTable } from "../widgets/types";

<<<<<<< HEAD
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

=======
const firstNames = ['Lucas', 'Amanda', 'Carlos', 'Juliana', 'Roberto', 'Beatriz', 'Fernando', 'Patrícia', 'Bruno', 'Mariana'];
const lastNames = ['Moreira', 'Ribeiro', 'Lima', 'Silva', 'Fernandes', 'Rocha', 'Souza', 'Almeida', 'Oliveira', 'Martins'];
const statuses = [EStatus.active, EStatus.pending, EStatus.inactive];

function generateClients(count: number): IClientPageTable[] {
  return []
  
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
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
