<template>
<<<<<<< HEAD
  <v-text-field v-bind="props" v-model="model" variant="solo-filled" density="comfortable" />
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    modelValue: string | number;
    label?: string;
    required?: boolean;
    type?: string;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });
=======
  <v-text-field
    v-bind="props"
    v-model="model"
    variant="solo-filled"
    density="comfortable"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number
  label?: string
  required?: boolean
  type?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
