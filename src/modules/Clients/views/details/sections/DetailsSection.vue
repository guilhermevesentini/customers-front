<<<<<<< HEAD
<template>
  <v-row>
    <v-col cols="12" md="6"> <v-label>Nome</v-label> {{ details?.name }} </v-col>
    <v-col cols="12" md="6"> <v-label>CPF</v-label> {{ formatCpf(details?.cpf || "") }} </v-col>
    <v-col cols="12" md="6"> <v-label>RG</v-label> {{ details?.rg || "--" }} </v-col>
    <v-col cols="12" md="6"> <v-label>Telefone</v-label> {{ details?.phone }} </v-col>
    <v-col cols="12" md="6">
      <v-label>Data de Nascimento</v-label> {{ formatDateToBr(details?.birthday || "") || "--" }}
    </v-col>
    <v-col cols="12" md="6"> <v-label>Email</v-label> {{ details?.email }} </v-col>
=======
<template>  
  <v-row>
    <v-col cols="12" md="6">
      <v-label>Nome</v-label>
      {{ details?.name }}
    </v-col>
    <v-col cols="12" md="6">
      <v-label>CPF</v-label>
      {{ formatCpf(details?.cpf || '') }}
    </v-col>
    <v-col cols="12" md="6">
      <v-label>RG</v-label>
      {{ details?.rg || '--' }}
    </v-col>
    <v-col cols="12" md="6">
      <v-label>Telefone</v-label>
      {{ details?.phone }}
    </v-col>
    <v-col cols="12" md="6">
      <v-label>Data de Nascimento</v-label>
      {{ formatDateToBr(details?.birthday || "") || '--' }}
    </v-col>        
    <v-col cols="12" md="6">
      <v-label>Email</v-label>
      {{ details?.email }}
    </v-col>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  </v-row>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import { formatCpf, formatDateToBr } from "@/core/utils/utils";
  import type { IDetails } from "@/modules/Clients/interfaces/IDetails";

  defineProps<{
    details: IDetails | undefined;
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
=======
import { formatCpf, formatDateToBr } from '@/core/utils/utils';
import type { IDetails } from '@/modules/Clients/interfaces/IDetails';

defineProps<{
  details: IDetails | undefined
}>()
</script>

<style scoped>
.v-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-bottom: 4px;
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</style>
