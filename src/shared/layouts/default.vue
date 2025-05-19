<template>
  <v-app class="app-wrapper">
    <v-app-bar title="Ez Customers">
      <v-spacer></v-spacer>
      <v-btn text @click="addMock" :loading="loading" :disabled="loading"> Aplicar Mock </v-btn>
      <v-btn text color="error" @click="deleteMock" :loading="loading" :disabled="loading">
        Limpar Mock
      </v-btn>
    </v-app-bar>
    <SideBar />
    <v-main class="app-wrapper__main">
      <v-container class="app-wrapper__main-content"> <RouterView /> </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import mockService from "@/core/mock/mockService";
  import SideBar from "./SideBar.vue";

  const { addMock, deleteMock, loading } = mockService();
</script>

<style lang="scss" scoped>
  .app-wrapper {
    height: 100dvh;
    position: relative;
    &__main {
      position: relative;
      height: 100%;
      &-content {
        padding: 0px;
        height: 100%;
        background: #eaeaea;
      }
    }
  }
</style>
