<<<<<<< HEAD
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
=======
<template>
  <v-switch 
  v-bind="props"
  v-model="model" 
  color="blue" 
  :label="label" 
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
