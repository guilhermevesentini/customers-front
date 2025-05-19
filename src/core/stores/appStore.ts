import { defineStore } from 'pinia'
import type { IAppStore } from './types'
import { ClientsApiAdapter } from '@/modules/Clients/services/adapters/ClientsAdapter'

export const useAppStore = defineStore('app', {
  state: (): IAppStore => ({
    loading: false,
    clients: []
  }),
  actions: {
    async getClients() {
      this.loading = true
      try {
        const response = await ClientsApiAdapter.getAll()
        this.clients = response;        
      } catch (error) {
        console.error('Erro ao buscar clientes:', error)
        this.clients = []
      } finally {
        this.loading = false
      }
    }
  }
})
