<template>
  <v-container style="height: calc(100dvh - 65px); overflow-y: auto">
    <v-card class="fill-width p-0 mb-5" flat>
      <PageTile :title="handleTitle" :loading="loading" @update:save="create" show-save />
    </v-card>
    <v-card class="fill-width p-0" flat>
      <v-tabs v-model="tab" bg-color="#fffff" class="rounded-lg" density="comfortable">
        <v-tab v-for="tab in tabItems" :key="tab.name">
          {{ tab.name }} <v-icon v-if="tab.isPending" class="ml-2">mdi-alert</v-icon>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-form ref="formRef">
      <v-window v-model="tab">
        <v-window-item value="Details">
          <v-container style="padding: 1rem 0">
            <PersonalDetails ref="personalDetailsRef" /> <AddressForm />
          </v-container>
        </v-window-item>
        <v-window-item value="Profile">
          <v-container style="padding: 1rem 0"> <RiskForm /> </v-container>
        </v-window-item>
        <v-window-item value="Products">
          <v-container style="padding: 1rem 0"> <Products ref="productsRef" /> </v-container>
        </v-window-item>
      </v-window>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { ClientFactory } from "@/domain/clients/factories/ClientFactory";
  import PageTile from "@/shared/components/ui/titles/PageTile.vue";
  import Products from "./fields/Products.vue";
  import { ClientsApiAdapter } from "../../services/adapters/ClientsAdapter";
  import type { IClient } from "../../interfaces/IClient";

  const tab = ref("Details");

  const loading = ref(false);
  const formRef = ref();

  const form = reactive<IClient>(ClientFactory.create().getClient);

  const route = useRoute();
  const clientId = route.params.id as string | undefined;

  const personalDetailsRef = ref();
  const productsRef = ref();

  const router = useRouter();

  const tabItems = ref([
    { name: "Details", isPending: false },
    { name: "Profile", isPending: false },
    { name: "Products", isPending: false },
  ]);

  provide("clientForm", form);

  const handleTitle = computed(() => (form.details.name ? form.details.name : "New Client"));

  async function create() {
    loading.value = true;

    const results = await Promise.all([
      personalDetailsRef.value?.validate(),
      productsRef.value ? productsRef.value?.validate() : { valid: true },
    ]);

    updateTabPending("Details", results[0]?.valid === false);
    updateTabPending("Products", results[1]?.valid === false);

    const allValid = results.every((r) => r?.valid);

    if (!allValid) {
      loading.value = false;
      return;
    }

    try {
      if (clientId) {
        await ClientsApiAdapter.update(clientId, ClientFactory.create(form).getClient);
      } else {
        await ClientsApiAdapter.create(ClientFactory.create(form).getClient);
      }

      router.push("/clients");
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  function updateTabPending(name: string, isPending: boolean) {
    const tab = tabItems.value.find((t) => t.name === name);
    if (tab) tab.isPending = isPending;
  }

  const obterClient = async (id: string) => {
    const response = await ClientsApiAdapter.getById(id);

    if (response) {
      Object.assign(form, ClientFactory.create(response).getClient);
    }
  };

  onMounted(() => {
    if (clientId) obterClient(clientId);
  });

  const PersonalDetails = defineAsyncComponent(() => import("./fields/PersonalForm.vue"));
  const AddressForm = defineAsyncComponent(() => import("./fields/AddressForm.vue"));
  const RiskForm = defineAsyncComponent(() => import("./fields/RiskForm.vue"));
  //const FilesForm = defineAsyncComponent(() => import('./fields/FilesForm.vue'))
</script>
