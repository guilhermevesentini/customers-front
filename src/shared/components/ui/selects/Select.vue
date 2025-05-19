<template>
  <v-select
    v-bind="props"
    v-model="model"
    :items="items"
    density="comfortable"
    variant="solo-filled"
    item-value="value"
    item-title="title"
<<<<<<< HEAD
    searchable
=======
    searchable    
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  />
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import { computed } from "vue";
  //:filter="customFilter"
  const props = defineProps<{
    modelValue: string | number | null;
    items: { value: string; title: string }[];
    label?: string;
    required?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | number | null): void;
  }>();

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });

  // const customFilter = (item: { value: string | number, title: string }[], search: string) => {
  //   const text = typeof item === 'object' ? item.title : item
  //   return item.toLowerCase().includes(search.toLowerCase())
  // }
=======
import { computed } from 'vue'
//:filter="customFilter"
const props = defineProps<{
  modelValue: string | number | null
  items: { value: string; title: string }[]
  label?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// const customFilter = (item: { value: string | number, title: string }[], search: string) => {
//   const text = typeof item === 'object' ? item.title : item
//   return item.toLowerCase().includes(search.toLowerCase())
// }
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
