<template>
  <div class="month-picker">
    <VueDatePicker
      v-model="model"
      month-picker
      text-input
      teleport
      auto-apply
      format="MMMM yyyy"
      :enable-time-picker="false"
      :placeholder="placeholder"
      :input-class="'custom-vuetify-input'"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import VueDatePicker from "@vuepic/vue-datepicker";

  const props = defineProps<{
    modelValue: { month: number; year: number } | null;
    placeholder?: string;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: { month: number; year: number } | null): void;
  }>();

  const model = ref(props.modelValue);

  watch(
    () => props.modelValue,
    (val) => (model.value = val),
  );
  watch(model, (val) => emit("update:modelValue", val));
</script>

<style scoped lang="scss">
  .month-picker {
    display: flex;
    flex-direction: column;
  }

  .v-label {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 4px;
    font-family: "Roboto", sans-serif;
  }

  .custom-vuetify-input {
    width: 100%;
    border-radius: 4px;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    height: 50px;
    box-shadow: 0 2px 0 0 #ccc;
    background-color: #f6f6f6;
  }

  ::v-deep(.dp__input_icon_pad) {
    background: #f6f6f6;
    border: none;
    box-shadow: 0 2px 0 0 #ccc;
    border-radius: 6px;
  }
  ::v-deep(.dp__input) {
    border: 0px solid transparent;
    padding-left: 43px;
    color: #7b7b7b;
  }
  ::v-deep(.dp__input_icon) {
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.54);
  }
</style>
