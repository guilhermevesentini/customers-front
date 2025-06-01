<template>
  <v-dialog v-model="internalShow" max-width="800">
    <v-card title="Arquivos">
      <v-card-text>
        <FilesList :details="files" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" @click="internalShow = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { IFiles } from "@/modules/Clients/@types/types";
  import { openFile } from "@/core/utils/utils";
  import FilesList from "@/shared/components/files/FilesList.vue";

  const props = defineProps<{
    files: IFiles[] | undefined;
    show: boolean;
  }>();

  const emit = defineEmits(["update:show"]);

  const internalShow = computed({
    get: () => props.show,
    set: (val) => emit("update:show", val),
  });

  function handleClick(file: IFiles) {
    openFile(file);
  }
</script>
