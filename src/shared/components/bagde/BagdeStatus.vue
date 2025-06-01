<template>
  <div
    :style="{
      ...handleStatusStyles,
      textAlign: 'center',
      fontSize: '15px',
      borderRadius: '10px',
      padding: '1px 0px',
      width: '100px',
      cursor: 'help',
    }"
  >
    {{ handleStatusStyles.text }}

    <v-tooltip activator="parent">{{ handleStatusStyles.tootip }}</v-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { EStatus } from "@/core/enums/enums";

  const props = defineProps<{
    status: EStatus | string;
  }>();

  type IStatusProps = {
    backgroundColor: string;
    color: string;
    tootip: string;
    text: string;
  };

  const handleStatusStyles = computed(() => {
    const status = props.status as EStatus;

    return handleStatus(status);
  });

  const handleStatus = (status: EStatus): IStatusProps => {
    switch (status) {
      case EStatus.active:
        return {
          backgroundColor: "#d1f1dd",
          color: "#15803d",
          tootip: "Cliente contém todos os produtos ativos",
          text: "Ativo",
        };
      case EStatus.pending:
        return {
          backgroundColor: "#f6f79f",
          color: "#807b15",
          tootip: "Cliente contém produtos pendentes",
          text: "Pendente",
        };
      case EStatus.inactive:
        return {
          backgroundColor: "#eae9ee",
          color: "#808080",
          tootip: "Cliente não contém produtos",
          text: "Inativo",
        };
      default:
        return {
          backgroundColor: "#eae9ee",
          color: "#808080",
          tootip: "Cliente não contém produtos",
          text: "Inativo",
        };
    }
  };
</script>

<style scoped></style>
