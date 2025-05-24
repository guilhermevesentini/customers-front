<template>
  <v-row dense class="pr-3 pl-3">
    <v-col cols="12" sm="6" md="3" v-for="card in cardsValues" :key="card.title">
      <v-card class="d-flex flex-column align-left justify-left pa-4" elevation="2">
        <div class="d-flex align-left justify-left">
          <v-icon size="22" color="grey lighten-1" class="mb-2">{{ card.icon }}</v-icon>
          <div class="text-subtitle-2 font-weight-medium ml-5">
            {{ card.title }}
          </div>
        </div>
        <div class="text-h5 mt-1 d-flex align-left justify-left">
          <b>{{ card.value }}</b>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { ECardsValues } from "./Dashboard/types";

  defineProps<{
    cardsValues: ECardsValues[];
  }>();
</script>
