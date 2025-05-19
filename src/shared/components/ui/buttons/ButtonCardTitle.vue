<template>
  <v-btn
    v-bind="$attrs"
    color="default"
    density="comfortable"
<<<<<<< HEAD
    :prepend-icon="icon"
    style="position: absolute; right: 10px; top: 10px"
    @click="emit('update:handleClick')"
  >
    {{ title }}
=======
    :prepend-icon="icon" 
    style="position: absolute;right: 10px; top: 10px;"
    @click="emit('update:handleClick')"
    >
    {{title}}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  </v-btn>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  defineProps<{
    title: string;
    icon: string;
  }>();

  const emit = defineEmits<{
    (e: "update:handleClick"): void;
  }>();
</script>

<style scoped></style>
=======
defineProps<{
  title: string
  icon: string
}>()

const emit = defineEmits<{
  (e: 'update:handleClick'): void
}>()
</script>

<style scoped>

</style>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
