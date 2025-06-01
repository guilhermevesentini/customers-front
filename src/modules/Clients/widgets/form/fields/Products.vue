<template>
  <v-btn
    class="mb-5 mt-2"
    color="secondary"
    prepend-icon="mdi-plus"
    style="width: 100%; height: 40px"
    @click="handleAdd"
    >Adicionar contrato</v-btn
  >
  <v-container class="mb-5" style="padding: 0">
    <v-card
      class="d-flex justify-center align-center"
      v-if="!form?.products.length"
      style="min-height: 200px"
    >
      Para adicionar um contrato, clique no botão "+ Adicionar contrato"
    </v-card>
    <v-card class="mb-5" v-for="product in form?.products" v-else>
      <PageTile title="Novo contrato" @update:delete="handleRemove(product)" show-delete />
      <ProductsChildren ref="childrenRefs" :product="product" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import ProductsChildren from "./ProductsChildren.vue";
  import PageTile from "@/shared/components/titles/PageTile.vue";
  import type { IClient, IProduct } from "@/modules/Clients/@types/types";
  import { createProductData } from "@/modules/Clients/factories/ProductsFactory";

  const form = inject<IClient>("clientForm");
  const childrenRefs = ref<InstanceType<typeof ProductsChildren>[]>([]);

  function handleAdd() {
    form?.products.unshift(createProductData());
  }

  function handleRemove(product: IProduct) {
    const index = form?.products.indexOf(product);
    if (index !== undefined && index > -1) {
      form?.products.splice(index, 1);
    }
  }

  async function validate() {
    if (!form?.products.length)
      return {
        errors: {},
        valid: true,
      };

    const results = await Promise.all(childrenRefs.value.map((ref) => ref?.validate()));
    return {
      valid: results.every((item) => item == true),
    };
  }

  defineExpose({ validate });
</script>
