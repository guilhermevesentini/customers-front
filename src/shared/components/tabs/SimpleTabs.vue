<template>
  <v-tabs v-model="tab" bg-color="blue-grey-lighten-5" class="rounded-lg" density="comfortable">
    <v-tab value="detalhes">Detalhes</v-tab> <v-tab value="seguros">Seguros</v-tab>
    <v-tab value="arquivos">Arquivos</v-tab> <v-tab value="agenda">Agenda</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="detalhes"> <!-- Conteúdo da aba Detalhes --> </v-window-item>
    <v-window-item value="seguros"> <!-- Conteúdo da aba Seguros --> </v-window-item>
    <v-window-item value="arquivos"> <!-- Conteúdo da aba Arquivos --> </v-window-item>
    <v-window-item value="agenda"> <!-- Conteúdo da aba Agenda --> </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const tab = ref("detalhes");
</script>
