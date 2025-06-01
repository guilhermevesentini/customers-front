<template>
  <v-container style="width: 100%; height: calc(100dvh - 10vh); overflow: auto">
    <v-row>
      <v-col cols="12">
        <FilterDashboard />
      </v-col>
      <v-col cols="12" style="margin: 0; padding: 0">
        <ResumeCards />
      </v-col>
      <v-col cols="12">
        <ApolicesTable @update:refresh="appStore.getClients()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import ResumeCards from "./widgets/cards/ResumeCards.vue";
  import ApolicesTable from "./widgets/apolices/ApolicesTable.vue";
  import FilterDashboard from "./widgets/filters/FilterDashboard.vue";
  import useDashboard from "./useDashboard";

  const { appStore } = useDashboard();

  onMounted(() => appStore.getClients());
</script>

<style lang="scss" scoped>
  .card-dashoard {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    height: 100%;

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      .icon {
        font-size: 40px;
        color: #cccccc62;
        padding: 0 2rem;
      }
    }

    &__content {
      &--title {
        color: #494949c9;
        display: flex;
        align-items: center;
        justify-self: center;
        justify-content: center;
        padding: 0;
      }
      &--value {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        color: #202020ee;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-self: center;
        justify-content: center;
      }
    }
  }
</style>
