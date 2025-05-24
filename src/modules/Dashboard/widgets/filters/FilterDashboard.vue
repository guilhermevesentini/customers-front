<template>
  <v-card class="fill-width card-dashoard" flat style="padding: 0; margin: 0">
    <v-col cols="12" md="3">
      <v-label>Mês:</v-label>
      <DatePickerMonth v-model="filters.selectedMonth" />
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Status:</v-label>
      <Select v-model="filters.status" placeholder="Selecione..." clearable :items="statusOpt" />
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
</template>

<script setup lang="ts">
  import { companiesOpt, statusOpt, tipoOpt } from "@/core/enums/enums";
  import DatePickerMonth from "@/shared/components/datepicker/DatePickerMonth.vue";
  import Select from "@/shared/components/selects/Select.vue";
  import useFilterDashboard from "./useFilterDashboard";

  const { filters } = useFilterDashboard();
</script>

<style scoped></style>
