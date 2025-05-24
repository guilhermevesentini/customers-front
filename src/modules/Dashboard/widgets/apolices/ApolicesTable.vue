<template>
  <v-card class="fill-width p-0" flat>
    <v-data-table
      fixed-header
      :headers="EHeadersApolicesPage"
      :items="apolicesList"
      height="auto"
      :search="searchedText"
      :item-value="itemKey"
      :items-per-page="5"
      :items-per-page-options="[5, 10, 25, 50]"
    >
      <template #item.status="{ item }">
        <BagdeStatus v-if="item.status" :status="item.status" />
      </template>
      <template #item.tipo="{ item }"> {{ getTextFromOptions(tipoOpt, item.tipo) }} </template>
      <template #item.company="{ item }">
        {{ getTextFromOptions(companiesOpt, item.company) }}
      </template>
      <template #item.vigencia="{ item }">
        {{ `${formatDateToBr(item?.start || "")} - ${formatDateToBr(item?.end || "")} ` }}
      </template>
      <template #item.price="{ item }"> {{ `R$ ${item?.price?.toFixed(2)}` }} </template>
      <template #item.actions="{ item }">
        <v-icon class="me-5" size="small" @click="openClient(item.id)"> mdi-eye-outline </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
  import { formatDateToBr, getTextFromOptions } from "@/core/utils/utils";
  import BagdeStatus from "@/shared/components/bagde/BagdeStatus.vue";
  import type { IApolicesList } from "@/core/stores/types";
  import { companiesOpt, tipoOpt } from "@/core/enums/enums";
  import useDashboard from "../../useDashboard";

  const searchedText = ref("");
  const router = useRouter();
  const itemKey = (item: any) => `${item.id}-${item.company}-${item.tipo}`;
  const { filteredProducts } = useDashboard();

  const EHeadersApolicesPage = [
    { key: "status", title: "Status", width: "20" },
    { key: "description", title: "Descrição" },
    { key: "tipo", title: "Tipo" },
    { key: "company", title: "Seguradora" },
    { key: "vigencia", title: "Vigência" },
    { key: "price", title: "Preço" },
    { key: "actions", title: "Açoes", sortable: false, width: "70" },
  ];

  function openClient(id: string | undefined) {
    if (!id) return;
    router.push(`/clients/client/${id}`);
  }

  const apolicesList = computed<IApolicesList>(() => {
    return filteredProducts.value.map((product) => ({
      ...product,
      id: product.clientId,
    }));
  });
</script>

<style scoped></style>
