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
      <v-col xs="12" sm="3" v-if="showMonthPicker"> </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
  import InputText from "@/shared/components/inputs/InputText.vue";
  import useClientsFilters from "./useClientsFilters";

  defineProps<{
    showMonthPicker?: boolean;
  }>();
  const { filters } = useClientsFilters();
</script>
