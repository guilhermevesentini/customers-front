<template>
  <v-text-field
    v-bind="props"
    v-model="model"
    inputmode="numeric"
    pattern="[0-9]*"
    type="text"
    variant="solo-filled"
    density="comfortable"
    @keypress="onlyNumbers"
  />
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import { computed } from "vue";

  const props = defineProps<{
    modelValue: string | number;
    label?: string;
    required?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });

  function onlyNumbers(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }
=======
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number
  label?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function onlyNumbers(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
