<template>
  <DrawerBase
    title="Importar Cliente"
    :show="show"
    @update:show="emit('update:show', $event)"
    @update:save="handleSave"
    @close="handleClose"
  >
    <v-container>
      <FileUploader v-model="files" />
    </v-container>
  </DrawerBase>
</template>

<script setup lang="ts">
  import type { IFiles, IClient } from "@/modules/Clients/@types/types";
  import DrawerBase from "@/shared/components/drawer/DrawerBase.vue";
  import FileUploader from "@/shared/components/upload/FileUploader.vue";
  import { ref } from "vue";
  import { processPdfToClient } from "@/core/composables/pdfParser/PdfParser";
  import { createClient } from "@/modules/Clients/factories/ClientFactory";
  import { ClientsApiAdapter } from "@/modules/Clients/services/adapters/ClientsAdapter";
  import { useToast } from "@/shared/components/alerts/useToast";
  import Card from "@/shared/components/cards/Card.vue";

  const show = ref(false);
  const files = ref<IFiles[]>([]);
  const loading = ref(false);
  const toast = useToast();

  const emit = defineEmits<{
    (e: "update:show", value: boolean): void;
    (e: "clientCreated"): void;
  }>();

  function handleClose() {
    show.value = false;
    files.value = [];
    emit("update:show", false);
  }
  /**
   * Valida se os dados do cliente são válidos antes de criar
   */
  function validateClientData(clientData: Partial<IClient>): { isValid: boolean; error?: string } {
    // Verificar se o cliente tem pelo menos um nome
    if (!clientData.details?.name || clientData.details.name.trim() === "") {
      return {
        isValid: false,
        error: "Não foi possível extrair o nome do cliente do PDF",
      };
    }

    // Verificar se há pelo menos um produto
    if (!clientData.products || clientData.products.length === 0) {
      return {
        isValid: false,
        error: "Não foi possível extrair informações do produto/apólice do PDF",
      };
    }

    return { isValid: true };
  }

  /**
   * Detecta o tipo de erro e retorna uma mensagem apropriada
   */
  function getErrorMessage(error: any, fileName: string): string {
    const errorMessage = error?.message || error?.toString() || "Erro desconhecido";

    // Verificar se é erro de senha do PDF
    if (
      errorMessage.toLowerCase().includes("password") ||
      errorMessage.toLowerCase().includes("senha") ||
      errorMessage.toLowerCase().includes("encrypted") ||
      errorMessage.toLowerCase().includes("criptografado")
    ) {
      return `O arquivo "${fileName}" está protegido por senha e não pode ser processado.`;
    }

    // Verificar se é erro de timeout
    if (errorMessage.toLowerCase().includes("timeout")) {
      return `Timeout ao processar o arquivo "${fileName}". O arquivo pode estar corrompido ou muito grande.`;
    }

    // Verificar se é erro de formato
    if (
      errorMessage.toLowerCase().includes("pdf válido") ||
      errorMessage.toLowerCase().includes("invalid")
    ) {
      return `O arquivo "${fileName}" não é um PDF válido.`;
    }

    // Verificar se é erro de extração de dados
    if (
      errorMessage.toLowerCase().includes("extrair") ||
      errorMessage.toLowerCase().includes("extract")
    ) {
      return `Não foi possível extrair dados do arquivo "${fileName}". O PDF pode estar danificado ou protegido.`;
    }

    // Erro genérico
    return `Erro ao processar o arquivo "${fileName}": ${errorMessage}`;
  }

  async function handleSave() {
    if (files.value.length === 0) {
      toast.error("Por favor, selecione pelo menos um arquivo PDF.");
      return;
    }

    loading.value = true;

    try {
      let createdCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      for (const file of files.value) {
        try {
          // Processar PDF e extrair informações
          const clientData = await processPdfToClient(file);

          // Validar dados antes de criar
          const validation = validateClientData(clientData);
          if (!validation.isValid) {
            errorCount++;
            const errorMsg = `${validation.error} (${file.name})`;
            errors.push(errorMsg);
            toast.warning(errorMsg);
            continue;
          }

          // Criar cliente usando a factory
          const client = createClient(clientData);

          // Salvar cliente
          await ClientsApiAdapter.create(client);
          createdCount++;
        } catch (error) {
          errorCount++;
          const errorMsg = getErrorMessage(error, file.name);
          errors.push(errorMsg);
          console.error(`Erro ao processar arquivo ${file.name}:`, error);
          toast.error(errorMsg);
        }
      }

      // Mostrar mensagens de resultado
      if (createdCount > 0) {
        toast.success(`${createdCount} cliente(s) criado(s) com sucesso!`);

        if (errorCount > 0) {
          // Aguardar um pouco antes de mostrar o erro para não sobrepor a mensagem de sucesso
          setTimeout(() => {
            toast.warning(`${errorCount} arquivo(s) falharam. Verifique os detalhes acima.`);
          }, 1000);
        }

        // Limpar arquivos após sucesso
        files.value = [];
        // Emitir evento para atualizar a lista
        emit("clientCreated");
        // Fechar drawer após 2 segundos
        emit("update:show", false);
      } else {
        // Nenhum cliente foi criado
        if (errorCount === files.value.length) {
          toast.error(
            "Não foi possível criar nenhum cliente. Verifique os arquivos PDF e tente novamente.",
          );
        }
      }
    } catch (error) {
      console.error("Erro ao processar PDFs:", error);
      toast.error("Erro ao processar os arquivos PDF. Tente novamente.");
    } finally {
      loading.value = false;
      handleClose();
    }
  }
</script>

<style scoped></style>
