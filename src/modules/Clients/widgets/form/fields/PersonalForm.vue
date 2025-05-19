<template>
  <v-card class="mb-5" title="Personal information">
    <v-container>
      <v-form ref="formRef" v-model="valid">
        <v-container v-if="form">
          <v-row>
            <v-col cols="12" md="6">
              <InputText
                v-model="form.details.name"
                label="First name *"
                required
                :rules="nameRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <Select
                v-model="form.details.status"
                :items="statusOpt"
                label="Status *"
                required
                :rules="statusRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="form.details.email"
                label="E-mail *"
                required
                :rules="emailRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <DatePickerInput v-model="form.details.birthday" label="Birthday" />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="form.details.cpf"
                v-maska:[cpfMask]
                label="CPF *"
                required
                :rules="cpfRules"
              />
            </v-col>
            <v-col cols="12" md="6">
              <InputText v-model="form.details.rg" mask="'##.###.###-#'" label="RG" required />
            </v-col>
            <v-col cols="12" md="6">
              <InputText
                v-model="form.details.phone"
                v-maska:[phoneMask]
                label="Phone *"
                required
                :rules="phoneRules"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import InputText from "@/shared/components/ui/inputs/InputText.vue";
  import type { IClient } from "@/modules/Clients/interfaces/IClient";
  import DatePickerInput from "@/shared/components/ui/datepicker/DatePickerInput.vue";
  import { cpfMask, phoneMask } from "@/core/utils/utils";
  import {
    cpfRules,
    emailRules,
    nameRules,
    phoneRules,
    statusRules,
  } from "@/core/validators/validationsRules";
  import { statusOpt } from "@/shared/enums/enums";
  import Select from "@/shared/components/ui/selects/Select.vue";

  const formRef = ref();
  const valid = ref(false);

  const form = inject<IClient>("clientForm");

  function validate() {
    return formRef.value?.validate();
  }

  defineExpose({ validate });
</script>
