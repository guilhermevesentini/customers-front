<template>
  <v-card-title class="d-flex justify-space-between mb-2 mt-2">
    <div class="position-relative d-flex align-start">
      <div class="me-4">
        <div class="d-flex align-center">
          <h3 class="ma-0">{{ title }}</h3>
          <BagdeStatus class="ml-5" v-if="status" :status="status || EStatus.inactive" />
        </div>
        <h5 class="ma-0 text-medium-emphasis">{{ subtitle }}</h5>
      </div>
    </div>

    <div>
      <v-btn
        class="ml-3"
        v-if="showImport"
        type="submit"
        color="secondary"
        density="comfortable"
        :loading="loading"
        prepend-icon="mdi-file-import"
        @click="emit('update:import')"
      >
        Importar
      </v-btn>
      <v-btn
        class="ml-3"
        v-if="showSave"
        type="submit"
        color="primary"
        density="comfortable"
        :loading="loading"
        prepend-icon="mdi-content-save"
        @click="emit('update:save')"
      >
        Salvar
      </v-btn>
      <v-btn
        class="ml-3"
        v-if="showCreate"
        type="submit"
        color="primary"
        density="comfortable"
        :loading="loading"
        prepend-icon="mdi-plus"
        @click="emit('update:create')"
      >
        Criar
      </v-btn>
      <v-btn
        class="ml-3"
        v-if="showEdit"
        type="submit"
        density="comfortable"
        :loading="loading"
        prepend-icon="mdi-pencil"
        @click="emit('update:edit')"
      >
        Editar
      </v-btn>
      <v-btn
        class="ml-3"
        v-if="showDelete"
        color="error"
        density="comfortable"
        :loading="loading"
        prepend-icon="mdi-delete"
        @click="emit('update:delete')"
      >
        Excluir
      </v-btn>
    </div>
  </v-card-title>
</template>

<script setup lang="ts">
  import { EStatus } from "@/core/enums/enums";
  import BagdeStatus from "../bagde/BagdeStatus.vue";

  defineProps<{
    title: string;
    subtitle?: string;
    status?: string;
    loading?: boolean;
    showSave?: boolean;
    showImport?: boolean;
    showCreate?: boolean;
    showEdit?: boolean;
    showDelete?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:save"): void;
    (e: "update:create"): void;
    (e: "update:edit"): void;
    (e: "update:delete"): void;
    (e: "update:import"): void;
  }>();
</script>

<style lang="scss" scoped>
  h5 {
    color: rgb(173, 173, 173);
    font-weight: 400;
  }
</style>
