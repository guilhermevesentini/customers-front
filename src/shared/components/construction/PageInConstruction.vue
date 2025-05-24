<template>
  <v-container>
    <v-card class="fill-width p-0 card-dashoard" flat style="height: 85dvh">
      <v-img class="img" :src="construction"></v-img>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import construction from "@/shared/assets/construction.png";
</script>

<style lang="scss" scoped>
  .img {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    height: 100%;
  }
</style>
