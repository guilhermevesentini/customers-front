<template>
  <v-btn
    v-bind="$attrs"
    color="default"
    density="comfortable"
    :prepend-icon="icon"
    style="position: absolute; right: 10px; top: 10px"
    @click="emit('update:handleClick')"
  >
    {{ title }}
  </v-btn>
</template>

<script setup lang="ts">
  defineProps<{
    title: string;
    icon: string;
  }>();

  const emit = defineEmits<{
    (e: "update:handleClick"): void;
  }>();
</script>

<style scoped></style>
