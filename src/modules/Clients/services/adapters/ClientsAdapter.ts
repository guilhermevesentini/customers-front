import type { IClientsRepository } from "../ports/IClientsRespository";
import storageApi from "@/core/http/storage";
import type { IClient, IProduct } from "../../@types/types";

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

    clients.push(client);

    const safeClients = JSON.parse(JSON.stringify(clients));
    await storageApi.post(CLIENTS_KEY, safeClients);
  },

  async update(id, client) {
    const clients = await this.getAll();

    const index = clients.findIndex((c) => c.id === id);
    if (index === -1) return null;

    clients[index] = client;

    const safeClients = JSON.parse(JSON.stringify(clients));
    await storageApi.put(CLIENTS_KEY, safeClients);

    return client;
  },
  async delete(id) {
    const clients = await this.getAll();
    const filteredClients = clients.filter((client) => client.id !== id);

    await storageApi.post(CLIENTS_KEY, filteredClients);
  },
  async renovarProduto(id: string, produto: IProduct): Promise<IProduct | null> {
    const clients = await this.getAll();

    const client = clients.find((client) => client.id === id);
    if (!client) return null;

    const produtoIndex = client.products.findIndex((p) => p.id === produto.id);

    if (produtoIndex === -1) return null;

    client.products[produtoIndex] = { ...produto };

    await this.update(client.id, client);

    return produto;
  },
};
