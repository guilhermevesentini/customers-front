<template>
  <v-container v-if="form?.documents">
    <v-form ref="riskForm" v-model="valid" lazy-validation>
      <FileUploader v-model="form.documents" />
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import type { IClient } from "@/modules/Clients/interfaces/IClient";
  import FileUploader from "@/shared/components/ui/upload/FileUploader.vue";
  import { watch } from "vue";

  const valid = ref(false);

  const form = inject<IClient>("clientForm");

  watch(
    () => form?.documents,
    (val) => {
      if (!val && form) {
        form.documents = [];
      }
    },
    { immediate: true },
  );
=======
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
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
