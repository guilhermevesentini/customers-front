<template>
  <div v-for="product in details" :key="product.name">
    <v-list density="compact">
<<<<<<< HEAD
      <v-list-item v-for="(item, i) in details" :key="i" :value="item" style="padding: 10px 0">
        <template v-slot:prepend> <v-icon icon="mdi-file"></v-icon> </template>
        <v-list-item-title v-text="item.name" />
        <div style="position: absolute; right: 10px; top: 4px">
          <v-btn color="default" class="mr-3" icon="mdi-eye" @click="openFile(product)" />
          <v-btn color="primary" icon="mdi-download" @click="downloadFile(product)" />
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
  import { base64ToBlob } from "@/core/utils/utils";
  import type { IFiles } from "@/domain/shared/Document/Document";

  defineProps<{
    details: IFiles[] | undefined;
  }>();

  function openFile(file: IFiles) {
    const blob = base64ToBlob(file.content, file.type);
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");
    setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
  }

  function downloadFile(file: IFiles) {
    const blob = base64ToBlob(file.content, file.type);
    const fileURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(fileURL);
  }
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
      <v-list-item
        v-for="(item, i) in details"
        :key="i"
        :value="item"
        style="padding: 10px 0"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-file"></v-icon>
        </template>

        <v-list-item-title v-text="item.name" />

        <div style="position: absolute; right: 10px; top: 4px">
          <v-btn color="default" class="mr-3" icon="mdi-eye" @click="openFile(product)"/>
          <v-btn color="primary" icon="mdi-download" @click="downloadFile(product)"/>
        </div>
      </v-list-item>
    </v-list>
  </div>  
</template>

<script setup lang="ts">
import { base64ToBlob } from '@/core/utils/utils';
import type { IFiles } from '@/domain/shared/Document/Document';

defineProps<{
  details: IFiles[] | undefined
}>()

function openFile(file: IFiles) {
  const blob = base64ToBlob(file.content, file.type)
  const fileURL = URL.createObjectURL(blob)
  window.open(fileURL, '_blank')
  setTimeout(() => URL.revokeObjectURL(fileURL), 10000)
}

function downloadFile(file: IFiles) {
  const blob = base64ToBlob(file.content, file.type)
  const fileURL = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = fileURL
  link.download = file.name
  link.click()
  URL.revokeObjectURL(fileURL)
}
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
