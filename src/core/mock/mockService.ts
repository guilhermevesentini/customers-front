import { ClientsApiAdapter } from "@/modules/Clients/services/adapters/ClientsAdapter"
import { mockClient } from "./ClientsMock"
import { ClientFactory } from "@/domain/clients/factories/ClientFactory"
import { useAppStore } from "../stores/appStore"

export default function mockService() {
  const loading = ref(false)

  const addMock = async () => {
    try {
      loading.value = true      
      for (const client of mockClient) {
        await ClientsApiAdapter.create(ClientFactory.create(client).getClient)
      }
    } catch (err) { console.log(err) }
    finally { 
      useAppStore().getClients()
      loading.value = false
    }
  }

  const deleteMock = async () => {
    try {
      loading.value = true
      const existingClients = await ClientsApiAdapter.getAll()
      for (const client of existingClients) {
        await ClientsApiAdapter.delete(client.id)
      }
    } catch (err) {
      console.error("Erro ao deletar mocks:", err)
    } finally {
      useAppStore().getClients()
      loading.value = false
    }
  }

  return {
    loading,
    addMock,
    deleteMock
  }
}