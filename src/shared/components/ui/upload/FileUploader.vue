<template>
  <v-container>
    <v-file-upload
      v-model="selectedFiles"
      label="Upload files"
      multiple
      prepend-icon="mdi-paperclip"
      show-size
      style="padding: 1rem"
      variant="solo-filled"
      @update:model-value="handleChange"
      accept="application/pdf"
    />
    <span
      v-if="!modelValue.length"
      class="d-flex justify-center align-center"
      style="height: 100px"
    >
      No uploaded files
    </span>
    <v-list v-if="modelValue.length" style="padding: 1rem 10px">
      <v-list-item v-for="(file, index) in modelValue" :key="index" class="border rounded mb-2">
        <v-list-item-title>{{ file.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ (file.size / 1024).toFixed(2) }} KB</v-list-item-subtitle>
        <template #append>
          <v-btn color="error" icon @click="removeFile(index)">
            <v-icon icon="mdi-delete" />
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
  import { readFileAsBase64 } from "@/core/utils/utils";
  import type { IFiles } from "@/domain/shared/Document/Document";
  import { ref, defineProps, defineEmits } from "vue";

  const props = defineProps<{
    modelValue: IFiles[];
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: IFiles[]): void;
  }>();

  const selectedFiles = ref<File[]>([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  async function handleChange(newValue: File[] | File) {
    const newFiles = Array.isArray(newValue) ? newValue : [newValue];
    const updatedFiles = [...props.modelValue];

    for (const file of newFiles) {
      if (file.type !== "application/pdf") {
        alert(`Arquivo "${file.name}" não é um PDF e será ignorado.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`Arquivo "${file.name}" é muito grande. Tamanho máximo permitido é 5MB.`);
        continue;
      }

      const alreadyExists = updatedFiles.some((f) => f.name === file.name && f.size === file.size);
      if (!alreadyExists) {
        const contentBase64 = await readFileAsBase64(file);

        const customFile: IFiles = {
          name: file.name,
          size: file.size,
          type: file.type,
          content: contentBase64,
        };
        updatedFiles.push(customFile);
      }
    }

    emit("update:modelValue", updatedFiles);
    selectedFiles.value = [];
  }

  function removeFile(index: number) {
    const updated = [...props.modelValue];
    updated.splice(index, 1);
    emit("update:modelValue", updated);
  }
</script>
