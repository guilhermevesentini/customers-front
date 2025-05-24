<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-label>Possui garagem?</v-label> {{ details?.hasGarage || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Local de estacionamento</v-label> {{ details?.parkingLocation || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Quantidade de veículos</v-label> {{ details?.vehicleCount ?? "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Possui segurança?</v-label> {{ details?.hasSecurity ? "Sim" : "Não" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Idade do condutor</v-label> {{ details?.driverAge || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Gênero do condutor</v-label> {{ details?.driverGender || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Estado civil</v-label> {{ details?.maritalStatus || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Possui filhos menores?</v-label> {{ details?.hasMinorChildren ? "Sim" : "Não" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Uso do veículo</v-label> {{ details?.vehicleUse || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Condutor jovem</v-label> {{ details?.hasYoungDriver || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Uso semanal</v-label> {{ details?.weeklyUse || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>KM por mês</v-label> {{ details?.kmPerMonth || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Tipo de cobertura</v-label> {{ details?.coverageType || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Tipo de franquia</v-label> {{ details?.franchiseType || "--" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Deseja assistência?</v-label> {{ details?.wantsAssistance ? "Sim" : "Não" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Deseja carro reserva?</v-label> {{ details?.wantsReserveCar ? "Sim" : "Não" }}
    </v-col>
    <v-col cols="12" md="3">
      <v-label>Deseja cobertura de vidros?</v-label>
      {{ details?.wantsGlassCoverage ? "Sim" : "Não" }}
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { IRiskProfile } from '@/modules/Clients/@types/types';

  defineProps<{
    details: IRiskProfile | undefined;
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
