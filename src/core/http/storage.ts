// src/api.ts (modo simulado para demo sem backend)
<<<<<<< HEAD
import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

const USER_KEY = "ez_customers";
=======
import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const USER_KEY = 'ez_customers';
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

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
<<<<<<< HEAD
  },
=======
  }
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
};

export default storageApi;
