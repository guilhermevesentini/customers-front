<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    min-width="auto"
    offset-y
    transition="scale-transition"
  >
    <template #activator="{ props: activatorProps }">
      <InputText
        v-bind="activatorProps"
        :label="label"
        :model-value="formattedValue"
        clearable
        :disabled="disabled"
        :rules="rules"
        variant="solo-filled"
        @click:clear="clearDate"
      />
    </template>

    <v-date-picker
      hide-header
      v-model="innerValue"
      @update:model-value="onUpdate"
    />
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import InputText from '../inputs/InputText.vue'

const props = defineProps<{
  modelValue: string | Date | null
  label?: string
  rules?: any[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | Date | null): void
}>()

const menu = ref(false)
const innerValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

function onUpdate(value: string | Date | null) {
  emit('update:modelValue', value)
  menu.value = false
}

function clearDate() {
  innerValue.value = null
  emit('update:modelValue', null)
}

function formatDateToBr(date: string | Date | null): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR')
}

const formattedValue = computed(() => formatDateToBr(innerValue.value))
</script>
