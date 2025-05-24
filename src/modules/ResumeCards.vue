<template>
  <v-row dense class="pr-3 pl-3">
    <v-col cols="12" sm="6" md="3" v-for="card in cardsValues" :key="card.title">
      <v-card class="d-flex flex-column align-left justify-left pa-4" elevation="2">
        <div class="d-flex align-left justify-left">
          <v-icon size="22" color="grey lighten-1" class="mb-2">{{ card.icon }}</v-icon>
          <div class="text-subtitle-2 font-weight-medium ml-5">
            {{ card.title }}
          </div>
        </div>
        <div class="text-h5 mt-1 d-flex align-left justify-left">
          <b>{{ card.value }}</b>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { EStatus } from "@/core/enums/enums";
  import type { ECardsValues } from "./Dashboard/types";
  import useDashboard from "./Dashboard/useDashboard";

  const { filteredProducts, clients } = useDashboard();

  const clientsFiltered = computed(() => {
    const clientIds = new Set(filteredProducts.value.map((p) => p.clientId));
    return clients.value.filter((client) => clientIds.has(client.id));
  });

  const cardsValues = computed((): ECardsValues[] => {
    const totalApolices = filteredProducts.value
      .reduce((acc, product) => acc + product.price, 0)
      .toFixed(2);

    return [
      {
        value: clientsFiltered.value.length.toString() || "0",
        title: "Clientes",
        icon: "mdi-account-group",
        id: 1,
      },
      {
        value: filteredProducts.value.length,
        title: "Apólices",
        icon: "mdi-file-account-outline",
        id: 2,
      },
      {
        value: filteredProducts.value.filter(
          (product) => String(product.status) === String(EStatus.pending),
        ).length,
        title: "Pendentes",
        icon: "mdi-alert",
        id: 3,
      },
      {
        value: `R$ ${totalApolices}`,
        title: "Receita",
        icon: "mdi-cash-register",
        id: 4,
      },
    ];
  });
</script>
