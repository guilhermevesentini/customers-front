<template>
  <InputText
    v-model="displayValue"
    v-maska
    data-maska="['(##) ####-####', '(##) #####-####']"
    label="Phone *"
    required
    :rules="rules"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { vMaska } from "maska";
  import InputText from "./InputText.vue";

  const props = defineProps<{
    modelValue: string | null | undefined;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | null): void;
  }>();

  // Valor exibido no campo (com máscara aplicada)
  const displayValue = ref("");

  // Regras de validação
  const rules = computed(() => [
    (v: string) => !!v || "Campo obrigatório",
    (v: string) => {
      if (!v) return true;
      const cleaned = v.replace(/[^\d]/g, "");
      return cleaned.length === 11 || "Telefone inválido (deve ter 11 dígitos)";
    },
  ]);

  // Sincroniza o modelValue com o displayValue
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue === null || newValue === undefined || !newValue) {
        displayValue.value = "";
      } else {
        // Garante que newValue seja uma string de dígitos antes de aplicar a máscara
        const cleaned = newValue.replace(/[^\d]/g, "");
        if (cleaned.length <= 11) {
          displayValue.value = mask(cleaned, "(##) # ####-####");
        } else {
          displayValue.value = "";
          emit("update:modelValue", null);
        }
      }
    },
    { immediate: true },
  );

  // Lida com a entrada do usuário
  watch(displayValue, (newValue) => {
    const cleaned = newValue.replace(/[^\d]/g, "");
    if (cleaned.length <= 11) {
      emit("update:modelValue", cleaned || null);
    }
  });

  // Lida com o evento blur para garantir a formatação
  const handleBlur = () => {
    if (!displayValue.value) {
      emit("update:modelValue", null);
      return;
    }

    // Remove a máscara, mantendo apenas os dígitos (ex.: "(11) 9 1234-5678" → "11912345678")
    const cleaned = displayValue.value.replace(/[^\d]/g, "");

    if (cleaned.length !== 11) {
      emit("update:modelValue", null);
      displayValue.value = "";
    } else {
      emit("update:modelValue", cleaned);
      // Formata o valor para exibição
      displayValue.value = mask(cleaned, "(##) # ####-####");
    }
  };
</script>
