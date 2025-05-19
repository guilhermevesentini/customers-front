<template>
  <v-card class="mb-5">
    <v-tabs v-model="currentTab">
      <v-tab
        v-for="tab in tabs"
        :key="tab.name"
        :value="tab.name"
        width="180"
      >
      {{ tab.name }}
      <v-icon v-if="tab.isPending" class="ml-2">mdi-alert</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="currentTab"  style="">
      <v-tabs-window-item
        v-for="tab in tabs"
        :key="tab.name"
        :value="tab.name"
      >
        <v-card flat style="background-color: #f8f8f8;height: calc(100dvh - 210px); overflow-y: auto;">
          <v-card-text>
            <slot :name="tab.name" />
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tab = { name: string; isPending?: boolean }

const props = defineProps<{
  tabs: Tab[]
  modelValue: string
}>()

const normalizedTabs = computed(() =>
  props.tabs.map(tab => (typeof tab === 'string' ? { name: tab, isPending: false } : tab))
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const currentTab = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<style lang="scss" scoped>
.v-tab {
  display: flex;
  align-items: center;
}

.v-icon {
  color: #f39c12;
}
</style>
