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
<<<<<<< HEAD
  import { EStatus } from "@/shared/enums/enums";

  defineProps<{
    status: EStatus | string;
  }>();

  const handleStatus = (status: EStatus) => {
    switch (status) {
      case EStatus.active:
        return {
          backgroundColor: "#d1f1dd",
          color: "#15803d",
        };
      case EStatus.pending:
        return {
          backgroundColor: "#f6f79f",
          color: "#807b15",
        };
      case EStatus.inactive:
        return {
          backgroundColor: "#eae9ee",
          color: "#808080",
        };
      default:
        return {};
    }
  };
=======
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
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

  const handleText = (status: EStatus) => {
    switch (status) {
      case EStatus.active:
<<<<<<< HEAD
        return "Active";
      case EStatus.pending:
        return "pending";
      case EStatus.inactive:
        return "Inactive";
      default:
        return "";
    }
  };
</script>

<style scoped></style>
=======
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
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
