<template><v-switch v-bind="props" v-model="model" color="blue" :label="label" /></template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    modelValue: boolean;
    label?: string;
    required?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });
</script>
