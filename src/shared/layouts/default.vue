<template>
  <v-app class="app-wrapper">
    <v-app-bar title="Ez Customers">
      <v-spacer></v-spacer>
<<<<<<< HEAD
      <v-btn text @click="addMock" :loading="loading" :disabled="loading"> Aplicar Mock </v-btn>
      <v-btn text color="error" @click="deleteMock" :loading="loading" :disabled="loading">
        Limpar Mock
      </v-btn>
    </v-app-bar>
    <SideBar />
    <v-main class="app-wrapper__main">
      <v-container class="app-wrapper__main-content"> <RouterView /> </v-container>
=======
      <v-btn
        text
        @click="addMock"
        :loading="loading"
        :disabled="loading"
      >
        Aplicar Mock
      </v-btn>
      <v-btn
        text
        color="error"
        @click="deleteMock"
        :loading="loading"
        :disabled="loading"
      >
        Limpar Mock
      </v-btn>
    </v-app-bar>

    <SideBar />
    <v-main class="app-wrapper__main">
      <v-container class="app-wrapper__main-content">
        <RouterView />
      </v-container>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    </v-main>
  </v-app>
</template>

<<<<<<< HEAD
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
=======

<script lang="ts" setup>
import mockService from '@/core/mock/mockService';
import SideBar from './SideBar.vue';

const { addMock, deleteMock, loading } = mockService()

</script>
<style lang="scss" scoped>
.app-wrapper {
  height: 100dvh; position: relative;
  &__main {
    position: relative; 
    height: 100%;
    &-content {
      padding: 0px; 
      height: 100%; 
      background: #eaeaea;
    }
  }
}</style>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
