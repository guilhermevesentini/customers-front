<template>
  <div
    :style="{
      ...handleStatus(status as EStatus),
      textAlign: 'center',
      fontSize: '15px',
      borderRadius: '10px',
      padding: '1px 0px',
      width: '100px',
    }"
  >
    {{ handleText(status as EStatus) }}
  </div>
</template>

<script setup lang="ts">
import { EStatus } from '@/shared/enums/enums';

defineProps<{
  status: EStatus | string
}>()

const handleStatus = (status: EStatus) => {
    switch (status) {
      case EStatus.active:
        return {
          backgroundColor: '#d1f1dd',
          color: '#15803d',
        }
      case EStatus.pending:
        return {
          backgroundColor: '#f6f79f',
          color: '#807b15',
        }
      case EStatus.inactive:
        return {
          backgroundColor: '#eae9ee',
          color: '#808080',
        }
      default:
        return {}
    }
  }

  const handleText = (status: EStatus) => {
    switch (status) {
      case EStatus.active:
        return 'Active'
      case EStatus.pending:
        return 'pending'
      case EStatus.inactive:
        return 'Inactive'
      default:
        return ''
    }
  }
</script>

<style scoped>

</style>