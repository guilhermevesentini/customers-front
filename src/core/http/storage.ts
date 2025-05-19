// src/api.ts (modo simulado para demo sem backend)
import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const USER_KEY = 'ez_customers';

function getUserId(): string {
  let id = localStorage.getItem(USER_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(USER_KEY, id);
  }
  return id;
}

const storageApi = {
  async get<T>(key: string): Promise<{ data: T | null }> {
    const userId = getUserId();
    const data = await localforage.getItem<T>(`${userId}:${key}`);
    return { data };
  },

  async post<T>(key: string, value: T): Promise<{ data: T }> {
    const userId = getUserId();
    await localforage.setItem(`${userId}:${key}`, value);
    return { data: value };
  },

  async delete(key: string): Promise<void> {
    const userId = getUserId();
    await localforage.removeItem(`${userId}:${key}`);
  },

  async put<T>(key: string, value: T): Promise<{ data: T }> {
    const userId = getUserId();
    await localforage.setItem(`${userId}:${key}`, value);
    return { data: value };
  }
};

export default storageApi;
