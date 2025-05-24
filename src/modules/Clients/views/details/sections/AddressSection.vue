<template>
  <v-row>
    <v-col cols="12" md="6"> <v-label>Endereço</v-label> {{ details?.address || "--" }} </v-col>
    <v-col cols="12" md="6"> <v-label>Número</v-label> {{ details?.number || "--" }} </v-col>
    <v-col cols="12" md="6">
      <v-label>Complemento</v-label> {{ details?.complement || "--" }}
    </v-col>
    <v-col cols="12" md="6"> <v-label>Cidade</v-label> {{ details?.city || "--" }} </v-col>
    <v-col cols="12" md="6"> <v-label>Estado</v-label> {{ details?.state || "--" }} </v-col>
    <v-col cols="12" md="6"> <v-label>CEP</v-label> {{ details?.zipcode || "--" }} </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { IAddress } from "@/modules/Clients/@types/types";

  defineProps<{
    details: IAddress | undefined;
  }>();
</script>

<style scoped>
  .v-label {
    font-weight: 500;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    margin-bottom: 4px;
  }
</style>
