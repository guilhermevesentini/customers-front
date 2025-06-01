<template>
  <v-container class="fill-width p-0" style="height: 100%; overflow-y: auto">
    <v-card class="fill-width p-0" flat>
      <PageTile title="Clientes" :loading="loading" @update:create="addClient" show-create />
      <ClientsFilters />
      <div class="overflow-y-auto p-0">
        <v-data-table
          fixed-header
          :headers="EHeadersClientsPage"
          height="auto"
          :items="clientsList"
          :search="searchedText"
          :items-per-page="5"
          :items-per-page-options="[5, 10, 25, 50]"
        >
          <template #item.status="{ item }">
            <BagdeStatus :status="item.status" />
          </template>
          <template #item.cpf="{ item }"> {{ formatCpf(item.details.cpf) }} </template>
          <template #item.apolices="{ item }"> {{ item.products.length || 0 }} </template>
          <template #item.actions="{ item }">
            <v-icon class="me-5" size="small" @click="openClient(item.id)">
              mdi-eye-outline
            </v-icon>
            <v-icon class="me-5" size="small" @click="editClient(item.id)"> mdi-pencil </v-icon>
            <v-icon color="error" size="small" @click="deleteItem(item.id)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import PageTile from "@/shared/components/titles/PageTile.vue";
  import { ref } from "vue";
  import useClientsPage from "./widgets/useClientsPage";
  import ClientsFilters from "./widgets/filters/ClientsFilters.vue";
  import { EHeadersClientsPage } from "./widgets/enums";
  import BagdeStatus from "@/shared/components/bagde/BagdeStatus.vue";
  import { ClientsApiAdapter } from "./services/adapters/ClientsAdapter";
  import { formatCpf } from "@/core/utils/utils";
  import type { IClient } from "./@types/types";
  import { createClient } from "./factories/ClientFactory";

  const loading = ref(false);
  const clientsList = ref<IClient[]>([]);

  const router = useRouter();

  const { searchedText } = useClientsPage();

  function addClient() {
    router.push("/clients/create");
  }

  function openClient(id: string) {
    router.push(`/clients/client/${id}`);
  }

  function editClient(id: string) {
    router.push(`clients/edit/${id}`);
  }

  async function deleteItem(id: string) {
    try {
      await ClientsApiAdapter.delete(id);
    } finally {
      getAllClients();
    }
  }

  const getAllClients = async () => {
    loading.value = true;
    try {
      const response = await ClientsApiAdapter.getAll();
      clientsList.value = response?.map((client) => createClient(client));
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      clientsList.value = [];
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => getAllClients());
</script>

<style scoped></style>
