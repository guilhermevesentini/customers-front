<template>
  <v-navigation-drawer
    v-model="internalShow"
    destroy-on-close
    temporary
    :location="location || 'right'"
    width="800"
    height="100dvh"
  >
    <v-card :title="title" flat style="height: 100%">
      <v-card-text style="height: calc(100% - 100px)">
        <slot />
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between" style="height: 50px">
        <v-btn class="ml-3" text="Fechar" @click="internalShow = false" prepend-icon="mdi-close" />
        <v-btn
          class="ml-3"
          text="Salvar"
          @click="emit('update:save')"
          color="primary"
          prepend-icon="mdi-content-save"
        />
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    title: string;
    show: boolean;
    location?: "left" | "right";
  }>();

  const emit = defineEmits<{
    (e: "update:show", value: boolean): void;
    (e: "update:save"): void;
    (e: "close"): void;
  }>();

  const internalShow = computed({
    get: () => props.show,
    set: (val) => emit("update:show", val),
  });

  const handleClose = () => {
    internalShow.value = false;
    emit("update:show", false);
    emit("close");
  };
</script>

<style scoped></style>
