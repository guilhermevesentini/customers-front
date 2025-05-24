<template>
  <v-container style="width: 100%; height: calc(100dvh - 10vh); overflow: auto">
    <v-row>
      <v-col cols="12">
        <v-card class="fill-width card-dashoard" flat style="padding: 0; margin: 0">
          <v-col cols="12" md="3">
            <v-label>Mês:</v-label>
            <DatePickerMonth v-model="filters.selectedMonth" />
          </v-col>
          <v-col cols="12" md="3">
            <v-label>Status:</v-label>
            <Select
              v-model="filters.status"
              placeholder="Selecione..."
              clearable
              :items="statusOpt"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-label>Tipo de seguro:</v-label>
            <Select v-model="filters.tipo" placeholder="Selecione..." clearable :items="tipoOpt" />
          </v-col>
          <v-col cols="12" md="3">
            <v-label>Seguradora:</v-label>
            <Select
              v-model="filters.company"
              placeholder="Selecione..."
              clearable
              :items="companiesOpt"
            />
          </v-col>
        </v-card>
      </v-col>
      <ResumeCards :cardsValues="CardsValues" />
      <v-col cols="12"> <ApolicesTable :apolices-list="apolicesList" /> </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useAppStore } from "@/core/stores/appStore";
  import ApolicesTable from "./ApolicesTable.vue";
  import type { IApolicesList } from "@/core/stores/types";
  import Select from "@/shared/components/selects/Select.vue";
  import { companiesOpt, EStatus, statusOpt, tipoOpt } from "@/core/enums/enums";
  import type { ECardsValues } from "./types";
  import DatePickerMonth from "@/shared/components/datepicker/DatePickerMonth.vue";
  import ResumeCards from "../ResumeCards.vue";

  const filters = ref({
    selectedMonth: new Date(),
    status: null,
    tipo: null,
    company: null,
  });

  const appStore = useAppStore();
  const { clients } = storeToRefs(appStore);

  const filteredProducts = computed(() => {
    return (
      clients.value.flatMap((client) =>
        client.products
          .filter((product) => {
            const startDate = new Date(product.start);
            const endDate = new Date(product.end);

            const selected = filters.value.selectedMonth;

            const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1);
            const monthEnd = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);

            const matchesMonth = startDate <= monthEnd && endDate >= monthStart;

            const matchesStatus =
              !filters.value.status || String(product.status) === String(filters.value.status);

            const matchesTipo = !filters.value.tipo || product.tipo === filters.value.tipo;

            const matchesCompany =
              !filters.value.company || product.company === filters.value.company;

            return matchesMonth && matchesStatus && matchesTipo && matchesCompany;
          })
          .map((product) => ({
            ...product,
            clientId: client.id,
            client,
          })),
      ) || []
    );
  });

  const clientsFiltered = computed(() => {
    const clientIds = new Set(filteredProducts.value.map((p) => p.clientId));
    return clients.value.filter((client) => clientIds.has(client.id));
  });

  const CardsValues = computed((): ECardsValues[] => {
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

  const apolicesList = computed<IApolicesList>(() => {
    return filteredProducts.value.map((product) => ({
      ...product,
      id: product.clientId,
    }));
  });

  onMounted(() => appStore.getClients());
</script>

<style lang="scss" scoped>
  .card-dashoard {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    height: 100%;

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      .icon {
        font-size: 40px;
        color: #cccccc62;
        padding: 0 2rem;
      }
    }

    &__content {
      &--title {
        color: #494949c9;
        display: flex;
        align-items: center;
        justify-self: center;
        justify-content: center;
        padding: 0;
      }
      &--value {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        color: #202020ee;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-self: center;
        justify-content: center;
      }
    }
  }
</style>
