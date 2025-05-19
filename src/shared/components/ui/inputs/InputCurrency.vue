<template>
  <v-text-field
    v-model="displayValue"
    v-mask="'#,##0.00'"
    :label="label"
    prefix="R$"
    type="text"
    clearable
    variant="solo-filled"
    density="comfortable"
    :rules="rules"
    @blur="handleBlur"
  ></v-text-field>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/core/utils/utils';
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: number | null
  label?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const displayValue = ref('')

const rules = computed(() => {
  const rulesArray = []
  
  if (props.required) {
    rulesArray.push((v: string) => !!v || 'Campo obrigatório')
  }
  
  rulesArray.push((v: string) => {
    if (!v) return true
    const cleaned = v.replace(/[^\d,]/g, '')
    return /^\d+(,\d{1,2})?$/.test(cleaned) || 'Formato inválido'
  })
  
  return rulesArray
})

watch(() => props.modelValue, (newValue) => {
  if (newValue === null) {
    displayValue.value = ''
  } else {
    displayValue.value = (newValue).toFixed(2).replace('.', ',')
  }
}, { immediate: true })

const handleBlur = () => {
  if (!displayValue.value) {
    emit('update:modelValue', null)
    return
  }

  const cleaned = displayValue.value.replace(/[^\d,]/g, '').replace(',', '.')
  const parsedValue = parseFloat(cleaned)
  
  if (isNaN(parsedValue)) {
    emit('update:modelValue', null)
    displayValue.value = ''
  } else {
    emit('update:modelValue', parsedValue)
    displayValue.value = formatCurrency(parsedValue.toFixed(2).replace('.', ','))
  }
}
</script>