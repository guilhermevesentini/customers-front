<template>
  <v-card class="mb-5" title="Address">
    <v-container>
      <v-form ref="formRef" v-model="valid" v-if="form">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
<<<<<<< HEAD
              <InputText
=======
              <InputText 
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
                v-model="form.address.address"
                label="Address*"
                required
                :rules="addressRules"
<<<<<<< HEAD
              />
            </v-col>
=======
                />
            </v-col>

>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
            <v-col cols="12" md="6">
              <InputNumber
                v-model="form.address.number"
                label="Number *"
                required
<<<<<<< HEAD
                inputmode="numeric"
                pattern="[0-9]*"
                :rules="numberOnlyRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText v-model="form.address.complement" label="Complement" />
            </v-col>
            <v-col cols="12" md="6">
              <InputText v-model="form.address.city" label="City *" required :rules="cityRules" />
=======
                inputmode="numeric" 
                pattern="[0-9]*"            
                :rules="numberOnlyRules"
              />
            </v-col>

            <v-col cols="12" md="6">
              <InputText
                v-model="form.address.complement"
                label="Complement"
              />
            </v-col>

            <v-col cols="12" md="6">
              <InputText
                v-model="form.address.city"
                label="City *"
                required
                :rules="cityRules"
              />
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="form.address.state"
                label="State *"
                required
                :rules="stateRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="form.address.zipcode"
                label="Zipcode *"
                required
                :rules="zipcodeRules"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  import {
    addressRules,
    cityRules,
    numberOnlyRules,
    stateRules,
    zipcodeRules,
  } from "@/core/validators/validationsRules";
  import type { IClient } from "@/modules/Clients/interfaces/IClient";
  import InputNumber from "@/shared/components/ui/inputs/InputNumber.vue";
  import InputText from "@/shared/components/ui/inputs/InputText.vue";

  const formRef = ref();
  const valid = ref(false);

  const form = inject<IClient>("clientForm");

  function validate() {
    return formRef.value?.validate();
  }

  defineExpose({ validate });
=======
  import { addressRules, cityRules, numberOnlyRules, stateRules, zipcodeRules } from '@/core/validators/validationsRules';
  import type { IClient } from '@/modules/Clients/interfaces/IClient';
  import InputNumber from '@/shared/components/ui/inputs/InputNumber.vue';
  import InputText from '@/shared/components/ui/inputs/InputText.vue';

  const formRef = ref()
  const valid = ref(false)

  const form = inject<IClient>('clientForm')

  function validate() {
    return formRef.value?.validate()
  }

  defineExpose({ validate })
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
</script>
