<template>
  <ToastNotification
    v-model="toastState.show"
    :message="toastState.message"
    :type="toastState.type"
    :timeout="toastState.timeout"
    :location="toastState.location"
    :variant="toastState.variant"
    :closable="toastState.closable"
    :action="toastState.action"
    :action-color="toastState.actionColor"
    :on-action="toastState.onAction"
  />
</template>

<script setup lang="ts">
  import { useToast } from "./useToast";
  import ToastNotification from "./ToastNotification.vue";

  const { toastState } = useToast();
</script>
