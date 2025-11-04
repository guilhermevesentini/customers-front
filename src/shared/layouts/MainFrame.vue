<template>
  <v-app class="app-wrapper">
    <Navbar />
    <SideBar />
    <v-main class="app-wrapper__main">
      <v-container class="app-wrapper__main-content"> <RouterView /> </v-container>
    </v-main>
    <ToastProvider />
  </v-app>
</template>

<script lang="ts" setup>
  import SideBar from "./SideBar.vue";
  import Navbar from "./Navbar.vue";
  import ToastProvider from "@/shared/components/alerts/ToastProvider.vue";
</script>

<style lang="scss" scoped>
  .app-wrapper {
    height: 100dvh;
    position: relative;
    background: #eaeaea;
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
