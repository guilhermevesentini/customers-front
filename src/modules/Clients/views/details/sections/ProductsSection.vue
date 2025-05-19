<template>
  <div v-for="product in details" :key="product.tipo">
<<<<<<< HEAD
    <v-card
      class="mt-5 mr-1 ml-1 mb-5"
      :title="getTextFromOptions(tipoOpt, product.tipo)"
      :subtitle="getTextFromOptions(companiesOpt, product.company)"
    >
      <BagdeStatus
        :status="product.status || '1'"
        style="position: absolute; right: 10px; top: 10px"
      />
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-label>Vigência</v-label>
            {{ `${formatDateToBr(product.start)} a ${formatDateToBr(product.end)}` }}
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Valor</v-label> <strong>{{ `R$ ${product.price.toFixed(2)}` }}</strong>
          </v-col>
          <v-col cols="12" md="12">
            <v-label>Files</v-label> <FilesList :details="product.files" />
=======
    <v-card class="mt-5 mr-1 ml-1 mb-5" :title="getTextFromOptions(tipoOpt, product.tipo)" :subtitle="getTextFromOptions(companiesOpt, product.company)">
      <BagdeStatus :status="product.status || '1'" style="position: absolute; right: 10px; top: 10px"/>
      <v-container>       
        <v-row>    
          <v-col cols="12" md="6">
            <v-label>Vigência</v-label>
            {{`${formatDateToBr(product.start)} a ${formatDateToBr(product.end)}` }}
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Valor</v-label>
            <strong>{{ `R$ ${product.price.toFixed(2)}` }}</strong>
          </v-col>
          <v-col cols="12" md="12">
            <v-label>Files</v-label>
            <FilesList :details="product.files"/>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
          </v-col>
        </v-row>
      </v-container>
    </v-card>
<<<<<<< HEAD
  </div>
</template>

<script setup lang="ts">
  import { formatDateToBr, getTextFromOptions } from "@/core/utils/utils";
  import type { IProduct } from "@/modules/Clients/interfaces/IProducts";
  import BagdeStatus from "@/shared/components/ui/bagde/BagdeStatus.vue";
  import FilesList from "@/shared/components/ui/files/FilesList.vue";
  import { companiesOpt, tipoOpt } from "@/shared/enums/enums";

  defineProps<{
    details: IProduct[] | undefined;
  }>();
</script>

<style scoped>
  .v-label {
    font-weight: 500;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    margin-bottom: 4px;
  }
=======
  </div>  
</template>

<script setup lang="ts">
import { formatDateToBr, getTextFromOptions } from '@/core/utils/utils';
import type { IProduct } from '@/modules/Clients/interfaces/IProducts';
import BagdeStatus from '@/shared/components/ui/bagde/BagdeStatus.vue';
import FilesList from '@/shared/components/ui/files/FilesList.vue';
import { companiesOpt, tipoOpt } from '@/shared/enums/enums';

defineProps<{
  details: IProduct[] | undefined
}>()
</script>

<style scoped>
.v-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-bottom: 4px;
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</style>
