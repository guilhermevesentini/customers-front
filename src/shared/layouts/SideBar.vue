<template>
  <v-navigation-drawer class="navigation-drawer" width="200">
    <v-list>
      <v-list-item exact prepend-icon="mdi-view-dashboard" title="Dashboard" to="/dashboard" />
      <v-list-item prepend-icon="mdi-account-group" title="Clients" to="/clients" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts"></script>

<style scoped>
  .navigation-drawer {
    background-color: #333;
    color: #fff;
  }
</style>
