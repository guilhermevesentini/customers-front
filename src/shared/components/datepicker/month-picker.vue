<template>
  <v-date-picker
    v-model:month="month"
    v-model:year="year"
    v-model:view-mode="viewMode"
    :class="['month-picker', { 'month-picker--hide-controls': showMonths }]"
    v-bind="{ hideHeader: true, ...$attrs }"
  />
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from "vue";

  const value = defineModel<string>();

  const props = defineProps<{
    showMonths: boolean;
  }>();

  const year = ref<number>(0);
  const month = ref<string | number | undefined>(undefined);
  const viewMode = ref<"month" | "months" | "year">("month");
  let emitBlockOnReset = false;

  function reset() {
    const today = new Date();
    year.value = today.getFullYear();
    month.value = undefined;
    emitBlockOnReset = true;
    nextTick(() => (emitBlockOnReset = false));
  }

  function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
  }

  watch(
    value,
    (v) => {
      if (v) {
        const [yearText, monthText] = v.split("-");
        year.value = clamp(Number(yearText), 1970, 2170);
        month.value = clamp(Number(monthText) - 1, 0, 11);
      } else {
        reset();
      }
    },
    { immediate: true },
  );

  watch(month, onChange);
  watch(year, onChange);

  function onChange() {
    if (emitBlockOnReset) return;
    if (!month.value) return;
    value.value = `${year.value}-${String(month.value || 0 + 1).padStart(2, "0")}`;
  }

  watch(
    viewMode,
    (v) => {
      if (v === "month" && props.showMonths) {
        viewMode.value = "months";
      }
    },
    { immediate: true },
  );
</script>

<style scoped>
  ::v-deep(.v-date-picker-month__days) {
    display: none;
  }
  ::v-deep(.v-date-picker-month:has(.v-date-picker-month__days)) {
    padding: 0;
  }

  .month-picker ::v-deep(.v-date-picker-controls) {
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }

  .month-picker--hide-controls ::v-deep(.v-date-picker-controls > .v-spacer),
  .month-picker--hide-controls ::v-deep(.v-date-picker-controls > .v-date-picker-controls__month) {
    display: none;
  }
</style>
