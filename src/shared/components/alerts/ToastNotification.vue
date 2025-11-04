<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="color"
    :location="location as any"
    :variant="variant"
    :closable="closable"
    @update:model-value="handleUpdate"
  >
    <div class="d-flex align-center">
      <v-icon v-if="icon" :icon="icon" class="me-2" />
      <span>{{ message }}</span>
    </div>
    <template v-if="action" #actions>
      <v-btn :color="actionColor" variant="text" @click="handleAction">
        {{ action }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from "vue";

  export interface ToastOptions {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    timeout?: number;
    location?:
      | "top"
      | "bottom"
      | "start"
      | "end"
      | "center"
      | "top start"
      | "top end"
      | "bottom start"
      | "bottom end"
      | "center start"
      | "center end";
    variant?: "text" | "flat" | "tonal" | "outlined" | "plain" | "elevated";
    closable?: boolean;
    action?: string;
    actionColor?: string;
    onAction?: () => void;
  }

  const props = withDefaults(defineProps<ToastOptions>(), {
    type: "info",
    timeout: 4000,
    location: "top end",
    variant: "flat",
    closable: true,
    actionColor: "white",
  });

  const emit = defineEmits<{
    (e: "update:show", value: boolean): void;
    (e: "close"): void;
    (e: "action"): void;
  }>();

  const show = ref(false);

  const color = computed(() => {
    switch (props.type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  });

  const icon = computed(() => {
    switch (props.type) {
      case "success":
        return "mdi-check-circle";
      case "error":
        return "mdi-alert-circle";
      case "warning":
        return "mdi-alert";
      case "info":
      default:
        return "mdi-information";
    }
  });

  function handleUpdate(value: boolean) {
    show.value = value;
    emit("update:show", value);
    if (!value) {
      emit("close");
    }
  }

  function handleAction() {
    if (props.onAction) {
      props.onAction();
    }
    emit("action");
    show.value = false;
  }

  // Expor método para mostrar o toast programaticamente
  function open() {
    show.value = true;
  }

  function close() {
    show.value = false;
  }

  defineExpose({
    open,
    close,
  });

  // Watch para abrir automaticamente quando o componente for montado com props
  watch(
    () => props.message,
    (newMessage) => {
      if (newMessage) {
        show.value = true;
      }
    },
    { immediate: true },
  );
</script>

<style scoped></style>
