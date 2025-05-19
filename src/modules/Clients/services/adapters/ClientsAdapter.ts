<<<<<<< HEAD
import api from "@/core/http/api";
import type { IClient } from "../../interfaces/IClient";
import type { IClientsRepository } from "../ports/IClientsRespository";
import storageApi from "@/core/http/storage";

const CLIENTS_KEY = "/clients";

export const ClientsApiAdapter: IClientsRepository = {
  async getAll() {
    const { data } = await storageApi.get<IClient[]>(CLIENTS_KEY);
    return data ?? [];
  },
  async getById(id) {
    const clients = await this.getAll();
    return clients.find((client) => client.id === id) ?? undefined;
  },
  async create(client) {
    const clients = await this.getAll();

=======
import api from "@/core/http/api"
import type { IClient } from "../../interfaces/IClient"
import type { IClientsRepository } from "../ports/IClientsRespository"
import storageApi from "@/core/http/storage"

const CLIENTS_KEY = '/clients';

export const ClientsApiAdapter: IClientsRepository = {
  async getAll() {
    const { data } = await storageApi.get<IClient[]>(CLIENTS_KEY)
    return data ?? []
  },
  async getById(id) {
    const clients = await this.getAll();
    return clients.find(client => client.id === id) ?? undefined;
  },
  async create(client) {
    const clients = await this.getAll();
  
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    clients.push(client);

    await storageApi.post(CLIENTS_KEY, clients);
  },
  async update(id, client) {
    const clients = await this.getAll();

<<<<<<< HEAD
    const index = clients.findIndex((client) => client.id === id);
=======
    const index = clients.findIndex(client => client.id === id);
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    if (index === -1) return null;

    clients[index] = JSON.parse(JSON.stringify(client));

    await storageApi.put(CLIENTS_KEY, clients);

<<<<<<< HEAD
    return client;
  },
  async delete(id) {
    const clients = await this.getAll();
    const filteredClients = clients.filter((client) => client.id !== id);

    await storageApi.post(CLIENTS_KEY, filteredClients);
  },
};
=======

    return client
  },
  async delete(id) {
    const clients = await this.getAll();
    const filteredClients = clients.filter(client => client.id !== id);

    await storageApi.post(CLIENTS_KEY, filteredClients);
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
