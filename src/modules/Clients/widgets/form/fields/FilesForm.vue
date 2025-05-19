<template>
  <v-container v-if="form?.documents">
    <v-form ref="riskForm" v-model="valid" lazy-validation>
      <FileUploader v-model="form.documents" />
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import type { IClient } from '@/modules/Clients/interfaces/IClient';
  import FileUploader from '@/shared/components/ui/upload/FileUploader.vue';
  import { watch } from 'vue'

  const valid = ref(false)
  
  const form = inject<IClient>('clientForm')

  watch(() => form?.documents, (val) => {
    if (!val && form) {
      form.documents = []
    }
  }, { immediate: true })
</script>
