<template>
  <v-container class="fill-width p-0 client-details">
    <v-card class="fill-width p-0 mb-5" flat>
      <PageTile
        :title="client?.details?.name || ''"
        :subtitle="`CPF: ${formatCpf(client?.details?.cpf || '--')}`"
        btnText="Criar novo"
        icon="mdi-plus"
        :status="client?.details.status"
        show-edit
        show-delete
        @update:delete="handleDelete"
        @update:edit="handleEdit"
      />
    </v-card>
    <v-card class="fill-width p-0" flat>
      <v-tabs v-model="tab" bg-color="#fffff" class="rounded-lg" density="comfortable">
        <v-tab value="details">Detalhes</v-tab> <v-tab value="profile">Perfil</v-tab>
        <v-tab value="products">Produtos</v-tab>
      </v-tabs>
    </v-card>
    <v-window class="mb-5" v-model="tab">
      <v-window-item value="details">
        <v-card class="mt-5 mr-1 ml-1 mb-5" title="Detalhes do cliente">
          <v-container> <DetailsSection :details="client?.details" /> </v-container>
        </v-card>
        <v-card class="mt-5 mr-1 ml-1 mb-5" title="Endereço">
          <v-container> <AddressSection :details="client?.address" /> </v-container>
        </v-card>
      </v-window-item>
      <v-window-item value="profile">
        <v-card class="mt-5 mr-1 ml-1 mb-5" title="Perfil">
          <v-container> <ProfileSection :details="client?.riskProfile" /> </v-container>
        </v-card>
      </v-window-item>
      <v-window-item value="products">
        <ProductsSection :details="client?.products" />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
  import PageTile from "@/shared/components/titles/PageTile.vue";
  import type { IClient } from "../../interfaces/IClient";
  import { ClientFactory } from "@/domain/clients/factories/ClientFactory";
  import { ClientsApiAdapter } from "../../services/adapters/ClientsAdapter";
  import { formatCpf } from "@/core/utils/utils";
  import DetailsSection from "./sections/DetailsSection.vue";
  import AddressSection from "./sections/AddressSection.vue";
  import ProfileSection from "./sections/ProfileSection.vue";
  import ProductsSection from "./sections/ProductsSection.vue";
  //import FilesSection from './sections/FilesSection.vue';

  const tab = ref("details");

  const route = useRoute();
  const clientId = route.params.id as string | undefined;

  const router = useRouter();

  const client = ref<IClient | undefined>(undefined);

  const handleDelete = async () => {
    try {
      if (client.value?.id) await ClientsApiAdapter.delete(client.value?.id);
    } finally {
      router.push("/clients");
    }
  };

  const handleEdit = () => {
    if (clientId) router.push(`/clients/edit/${clientId}`);
  };

  const obterClient = async (id: string) => {
    const response = await ClientsApiAdapter.getById(id);

    if (response) {
      client.value = ClientFactory.create(response).getClient;
    }
  };

  onMounted(() => {
    if (clientId) obterClient(clientId);
  });
</script>

<style lang="scss" scoped>
  .client-details {
    height: 100%;
    overflow-y: auto;
  }
</style>
