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
      v-model="selectedDate"
      :view-mode="currentViewMode"
      hide-header
      @update:view-mode="handleViewModeUpdate"
      @update:year="handleYearUpdate"
      @update:month="handleMonthUpdate"
    />
  </v-menu>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from "vue";
  import InputText from "../inputs/InputText.vue";

  const props = defineProps<{
    modelValue: string | Date | null;
    label?: string;
    rules?: any[];
    disabled?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string | Date | null): void;
  }>();

  const menu = ref(false);
  const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : new Date());
  const currentViewMode = ref<"months" | "year" | undefined>("months");

  const handleMonthUpdate = (month: number) => {
    const date = new Date(selectedDate.value);
    date.setMonth(month);
    selectedDate.value = date;

    emit("update:modelValue", new Date(date));
    menu.value = false;
  };

  const handleYearUpdate = (year: number) => {
    const date = new Date(selectedDate.value);
    date.setFullYear(year);
    selectedDate.value = date;
  };

  const handleViewModeUpdate = (newViewMode: string) => {
    if (newViewMode !== "months" && newViewMode !== "year") {
      currentViewMode.value = "months";
    } else {
      currentViewMode.value = "months";
    }
  };

  const clearDate = () => {
    emit("update:modelValue", null);
    selectedDate.value = new Date();
  };

  const formattedValue = computed(() => {
    if (!props.modelValue) return "";
    const date = new Date(props.modelValue);

    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${month}/${year}`;
  });

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal) {
        const date = new Date(newVal);
        if (!isNaN(date.getTime())) {
          selectedDate.value = date;
        }
      }
    },
  );
</script>
