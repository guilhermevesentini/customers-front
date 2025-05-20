<template>
  <v-card-text>
    <v-row>
      <v-col>
        <InputText
          v-model="filters.search"
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
        />
      </v-col>
      <v-col xs="12" sm="3" v-if="showMonthPicker"> <MonthPicker v-model="filters.month" /> </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
  import { ref } from "vue"; // Importando 'ref' para reatividade
  import InputText from "@/shared/components/ui/inputs/InputText.vue";
  import useClientsFilters from "./useClientsFilters";
  import MonthPicker from "@/shared/components/ui/datepicker/MonthPicker.vue";

  defineProps<{
    showMonthPicker?: boolean;
  }>();
  const { filters } = useClientsFilters();
</script>
