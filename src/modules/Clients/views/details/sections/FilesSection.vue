<template>
  <div v-for="product in details" :key="product.name">
    <v-card class="mt-5 mr-1 ml-1 mb-5" :title="product.name" :subtitle="`size: ${product.size}`">
      <div style="position: absolute; right: 10px; top: 10px">
        <v-btn color="default" class="mr-3" icon="mdi-eye" @click="openFile(product)" />
        <v-btn color="primary" icon="mdi-download" @click="downloadFile(product)" />
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import { downloadFile, openFile } from "@/core/utils/utils";
  import type { IFiles } from "@/modules/Clients/@types/types";

  defineProps<{
    details: IFiles[] | undefined;
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
