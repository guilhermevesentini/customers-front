<template>
  <v-dialog
    v-model="internalShow"
    max-width="100%"
    height="100%"
    transition="dialog-right-transition"
    fullscreen
    scrollable
  >
    <v-card>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="internalShow = false"></v-btn>

        <v-toolbar-title>Renovar Apólice</v-toolbar-title>

        <v-toolbar-items>
          <v-btn type="submit" text="Salvar" @click="renovar" :loading="loading" />
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="formRef">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <Select
                  v-model="product.status"
                  :items="statusOpt"
                  label="Status *"
                  required
                  :rules="statusRules"
                />
              </v-col>
              <v-col cols="12" md="6">
                <Select
                  v-model="product.tipo"
                  :items="tipoOpt"
                  label="Tipo de seguro *"
                  required
                  :rules="tipoRules"
                />
              </v-col>
              <v-col cols="12" md="6">
                <Select
                  v-model="product.company"
                  :items="companiesOpt"
                  label="Seguradora *"
                  required
                  :rules="companyRules"
                />
              </v-col>
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
                  v-model="product.start"
                  label="Início de vigência*"
                  clearable
                  required
                  :rules="requiredDate()"
                />
              </v-col>
              <v-col cols="12" md="6">
                <DatePickerInput
                  v-model="product.end"
                  label="Fim de vigência*"
                  clearable
                  :disabled="!product.start"
                  required
                  :rules="startEndDateRules(product.start, product.end)"
                />
              </v-col>
              <v-col cols="12" md="12"> <FileUploader v-model="product.files" /> </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { companiesOpt, statusOpt, tipoOpt } from "@/core/enums/enums";
  import {
    companyRules,
    priceRules,
    requiredDate,
    startEndDateRules,
    statusRules,
    tipoRules,
  } from "@/core/validators/validationsRules";
  import type { IProduct } from "@/modules/Clients/@types/types";
  import { ClientsApiAdapter } from "@/modules/Clients/services/adapters/ClientsAdapter";
  import DatePickerInput from "@/shared/components/datepicker/DatePickerInput.vue";
  import InputCurrency from "@/shared/components/inputs/InputCurrency.vue";
  import Select from "@/shared/components/selects/Select.vue";
  import FileUploader from "@/shared/components/upload/FileUploader.vue";

  const loading = ref(false);

  const props = defineProps<{
    apolice: Partial<IProduct> | undefined;
    clientId: string | undefined;
    show: boolean;
  }>();

  const emit = defineEmits(["update:show", "update:fechar"]);

  const internalShow = computed({
    get: () => props.show,
    set: (val) => emit("update:show", val),
  });

  const formRef = ref();

  const product = ref<IProduct>({
    id: "",
    status: "",
    tipo: "",
    company: "",
    price: 0,
    start: "",
    end: "",
    description: "",
    files: [],
  });

  const renovar = async () => {
    try {
      loading.value = true;

      console.log("formRef.value");

      const isValid = await formRef.value?.validate();

      if (!isValid.valid) return;

      if (!props.clientId) return;

      const response = await ClientsApiAdapter.renovarProduto(props.clientId, product.value);

      if (response) {
        internalShow.value = false;
        emit("update:fechar");
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => props.show,
    (val) => {
      if (val && props.apolice) {
        product.value = {
          id: props.apolice.id || "",
          status: props.apolice.status || "",
          tipo: props.apolice.tipo || "",
          company: props.apolice.company || "",
          price: props.apolice.price || 0,
          start: props.apolice.start || "",
          end: props.apolice.end || "",
          description: props.apolice.description || "",
          files: props.apolice.files || [],
        };
      }
    },
  );
</script>
