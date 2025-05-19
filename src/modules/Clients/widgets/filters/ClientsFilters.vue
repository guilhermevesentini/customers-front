<template>
  <v-card-text>
    <v-row>
      <v-col>
        <InputText
<<<<<<< HEAD
          v-model="filters.search"
=======
          v-model="filters.search"          
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
        />
      </v-col>
<<<<<<< HEAD
      <v-col xs="12" sm="3" v-if="showMonthPicker"> <MonthPicker v-model="filters.month" /> </v-col>
=======
      <v-col xs="12" sm="3" v-if="showMonthPicker">
       <MonthPicker v-model="filters.month" />
      </v-col>      
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import { ref } from "vue"; // Importando 'ref' para reatividade
  import InputText from "@/shared/components/ui/inputs/InputText.vue";
  import useClientsFilters from "./useClientsFilters";
  import MonthPicker from "@/shared/components/ui/datepicker/MonthPicker.vue";

  defineProps<{
    showMonthPicker?: boolean;
  }>();
  const { filters } = useClientsFilters();
=======
import { ref } from 'vue'; // Importando 'ref' para reatividade
import InputText from '@/shared/components/ui/inputs/InputText.vue';
import useClientsFilters from './useClientsFilters';
import MonthPicker from '@/shared/components/ui/datepicker/MonthPicker.vue';

defineProps<{
  showMonthPicker?: boolean
}>()
const { filters } = useClientsFilters()
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
