<template>
  <v-card class="fill-width p-0" flat>
    <PageTile title="Apólices" />
    <div class="pa-4">
      <InputText
        v-model="searchedText"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        density="compact"
      />
    </div>
    <v-data-table
      fixed-header
      :headers="EHeadersApolicesPage"
      :items="filteredProducts"
      height="auto"
      :search="searchedText"
      :item-value="itemKey"
      :items-per-page="5"
      :items-per-page-options="[5, 10, 25, 50]"
    >
      <template #item.status="{ item }">
        <BagdeStatus v-if="item.status" :status="item.status" />
      </template>
      <template #item.tipo="{ item }"> {{ getTextFromOptions(tipoOpt, item.tipo) }} </template>
      <template #item.company="{ item }">
        {{ getTextFromOptions(companiesOpt, item.company) }}
      </template>
      <template #item.vigencia="{ item }">
        {{ `${formatDateToBr(item?.start || "")} - ${formatDateToBr(item?.end || "")} ` }}
      </template>
      <template #item.price="{ item }"> {{ `R$ ${item?.price?.toFixed(2)}` }} </template>
      <template #item.actions="{ item }">
        <div class="d-flex align-center">
          <div>
            <v-icon class="me-5" size="small" @click="openClient(item)"> mdi-eye-outline </v-icon>
            <v-tooltip activator="parent">Ver cliente</v-tooltip>
          </div>
          <div v-if="item.files && item.files?.length >= 1">
            <v-icon class="me-5" size="small" @click="handleOpenFile(item.files)">
              mdi-file-account-outline
            </v-icon>
            <v-tooltip activator="parent">Visualizar PDFs</v-tooltip>
          </div>
          <div>
            <v-icon class="me-5" size="small" @click="handleRenew(item, item.id)">
              mdi-autorenew
            </v-icon>
            <v-tooltip activator="parent">Renovar</v-tooltip>
          </div>
        </div>
      </template>
    </v-data-table>
  </v-card>
  <FilesDialog v-model:show="showFilesDialog" :files="selectedFiles" />
  <RenewDrawer
    v-model:show="showRenewDialog"
    :apolice="selectedRenew"
    :client-id="selectedClientId"
    @update:fechar="emit('update:refresh')"
  />
</template>

<script setup lang="ts">
  import { formatDateToBr, getTextFromOptions } from "@/core/utils/utils";
  import BagdeStatus from "@/shared/components/bagde/BagdeStatus.vue";
  import { companiesOpt, tipoOpt } from "@/core/enums/enums";
  import useDashboard from "../../useDashboard";
  import PageTile from "@/shared/components/titles/PageTile.vue";
  import type { IFiles, IProduct } from "@/modules/Clients/@types/types";
  import FilesDialog from "./FilesDialog.vue";
  import RenewDrawer from "./RenewDrawer.vue";
  import InputText from "@/shared/components/inputs/InputText.vue";

  const searchedText = ref("");
  const router = useRouter();
  const itemKey = (item: any) => `${item.id}-${item.company}-${item.tipo}`;
  const { filteredProducts } = useDashboard();

  const showFilesDialog = ref(false);
  const selectedFiles = ref<IFiles[] | undefined>(undefined);
  const showRenewDialog = ref(false);
  const selectedRenew = ref<Partial<IProduct> | undefined>(undefined);
  const selectedClientId = ref<string | undefined>(undefined);

  const emit = defineEmits(["update:refresh"]);

  const EHeadersApolicesPage = [
    { key: "status", title: "Status", width: "20" },
    { key: "description", title: "Cliente" },
    { key: "tipo", title: "Tipo" },
    { key: "company", title: "Seguradora" },
    { key: "vigencia", title: "Vigência" },
    { key: "price", title: "Preço" },
    { key: "actions", title: "Açoes", sortable: false, width: "60" },
  ];

  function openClient(item: Partial<IProduct> & { clientId: string }) {
    if (!item) return;
    router.push(`/clients/client/${item.clientId}`);
  }

  const handleOpenFile = (files: IFiles[] | undefined) => {
    if (!files) return;
    selectedFiles.value = files;
    showFilesDialog.value = true;
  };

  const handleRenew = (
    apolice: Partial<IProduct> & { clientId: string },
    clientId: string | undefined,
  ) => {
    if (!apolice || !clientId) return;
    selectedRenew.value = apolice;
    selectedClientId.value = apolice.clientId;
    showRenewDialog.value = true;
  };
</script>

<style scoped></style>
