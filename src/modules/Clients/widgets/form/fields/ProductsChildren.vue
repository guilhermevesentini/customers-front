<template>
  <v-form ref="formRef" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <Select
            v-model="product.status"
            :items="statusOpt"
            label="Status *"
            required
            :rules="statusRules"
<<<<<<< HEAD
          />
=======
          />              
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
        </v-col>
        <v-col cols="12" md="6">
          <Select
            v-model="product.tipo"
            :items="tipoOpt"
            label="Tipo de seguro *"
            required
            :rules="tipoRules"
<<<<<<< HEAD
          />
        </v-col>
=======
          />              
        </v-col>

>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
        <v-col cols="12" md="6">
          <Select
            v-model="product.company"
            :items="companiesOpt"
            label="Seguradora *"
            required
            :rules="companyRules"
          />
        </v-col>
<<<<<<< HEAD
        <v-col cols="12" md="6">
          <InputCurrency v-model="product.price" label="Valor *" required :rules="priceRules" />
        </v-col>
        <v-col cols="12" md="6">
          <DatePickerInput
=======
        
        <v-col cols="12" md="6">
          <InputCurrency
            v-model="product.price"
            label="Valor *"
            required
            :rules="priceRules"
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <DatePickerInput 
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
            v-model="product.start"
            label="Start *"
            clearable
            required
            :rules="requiredDate('start')"
<<<<<<< HEAD
          />
        </v-col>
        <v-col cols="12" md="6">
          <DatePickerInput
            v-model="product.end"
            label="End *"
            clearable
            :disabled="!product.start"
            required
            :rules="startEndDateRules(product.start, product.end)"
          />
        </v-col>
        <v-col cols="12" md="12"> <FileUploader v-model="product.files" /> </v-col>
=======
            />
        </v-col>

        <v-col cols="12" md="6">
          <DatePickerInput 
          v-model="product.end" 
          label="End *"
          clearable
          :disabled="!product.start"
          required
          :rules="startEndDateRules(product.start, product.end)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <FileUploader 
          v-model="product.files" 
          />
        </v-col>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import {
    companyRules,
    priceRules,
    requiredDate,
    startEndDateRules,
    statusRules,
    tipoRules,
  } from "@/core/validators/validationsRules";
  import type { IProduct } from "@/modules/Clients/interfaces/IProducts";
  import DatePickerInput from "@/shared/components/ui/datepicker/DatePickerInput.vue";
  import InputCurrency from "@/shared/components/ui/inputs/InputCurrency.vue";
  import Select from "@/shared/components/ui/selects/Select.vue";
  import FileUploader from "@/shared/components/ui/upload/FileUploader.vue";
  import { companiesOpt, statusOpt, tipoOpt } from "@/shared/enums/enums";

  const props = defineProps<{ product: IProduct }>();

  const formRef = ref();
  const valid = ref(false);

  watch(
    () => props.product.start,
    (newStart) => {
      if (newStart) {
        const startDate = new Date(newStart);
        const endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + 1);
        props.product.end = endDate.toDateString();
      }
    },
  );

  defineExpose({
    async validate() {
      const result = await formRef.value?.validate();
      return result?.valid ?? false;
    },
  });
</script>

<style scoped></style>
=======
import { companyRules, priceRules, requiredDate, startEndDateRules, statusRules, tipoRules } from '@/core/validators/validationsRules'
import type { IProduct } from '@/modules/Clients/interfaces/IProducts';
import DatePickerInput from '@/shared/components/ui/datepicker/DatePickerInput.vue';
import InputCurrency from '@/shared/components/ui/inputs/InputCurrency.vue';
import Select from '@/shared/components/ui/selects/Select.vue';
import FileUploader from '@/shared/components/ui/upload/FileUploader.vue';
import { companiesOpt, statusOpt, tipoOpt } from '@/shared/enums/enums';

const props = defineProps<{ product: IProduct }>()

const formRef = ref()
const valid = ref(false)

watch(() => props.product.start, (newStart) => {
  if (newStart) {
    const startDate = new Date(newStart)
    const endDate = new Date(startDate)
    endDate.setFullYear(startDate.getFullYear() + 1)
    props.product.end = endDate.toDateString()
  }
})

defineExpose({
  async validate() {
    const result = await formRef.value?.validate()
    return result?.valid ?? false
  }
})
</script>

<style scoped>

</style>
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
