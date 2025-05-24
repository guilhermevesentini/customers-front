<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </template>
      <v-card min-width="300">
        <v-divider></v-divider>
        <v-list>
          <v-list-item :loading="loading" @click="addMock">Aplicar dados de teste</v-list-item>
          <v-list-item :loading="loading" @click="deleteMock">Limpar todos os dados</v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
  import mockService from "@/core/mock/mockService";
  import { ref } from "vue";

  const menu = ref(false);

  const { addMock, deleteMock, loading } = mockService();
</script>
