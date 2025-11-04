# Toast Notification Component

Componente reutilizável de notificação toast para exibir mensagens de sucesso, erro, aviso e informação.

## 📦 Componentes

- **ToastNotification.vue**: Componente base de toast
- **ToastProvider.vue**: Provider global que gerencia o estado do toast
- **useToast.ts**: Composable para gerenciar notificações toast de forma programática

## 🚀 Uso Básico

### 1. Uso com Composable (Recomendado)

O `ToastProvider` já está incluído no `MainFrame.vue`, então você pode usar o composable `useToast` em qualquer componente:

```vue
<script setup lang="ts">
import { useToast } from "@/shared/components/alerts/useToast";

const toast = useToast();

// Mensagem de sucesso
toast.success("Cliente criado com sucesso!");

// Mensagem de erro
toast.error("Erro ao criar cliente");

// Mensagem de aviso
toast.warning("Atenção: dados incompletos");

// Mensagem de informação
toast.info("Processando...");
</script>
```

### 2. Uso Direto do Componente

```vue
<template>
  <ToastNotification
    v-model="showToast"
    message="Cliente criado com sucesso!"
    type="success"
    :timeout="4000"
    location="top end"
    variant="flat"
    :closable="true"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ToastNotification from "@/shared/components/alerts/ToastNotification.vue";

const showToast = ref(false);

function showSuccess() {
  showToast.value = true;
}
</script>
```

## 📝 Opções Disponíveis

### Tipos de Toast

- `success`: Mensagem de sucesso (verde)
- `error`: Mensagem de erro (vermelho)
- `warning`: Mensagem de aviso (amarelo/laranja)
- `info`: Mensagem de informação (azul)

### Propriedades do ToastNotification

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `message` | `string` | - | Mensagem a ser exibida (obrigatório) |
| `type` | `"success" \| "error" \| "warning" \| "info"` | `"info"` | Tipo do toast |
| `timeout` | `number` | `4000` | Tempo em milissegundos até fechar automaticamente |
| `location` | `string` | `"top end"` | Posição do toast na tela |
| `variant` | `"text" \| "flat" \| "tonal" \| "outlined" \| "plain" \| "elevated"` | `"flat"` | Variante visual do toast |
| `closable` | `boolean` | `true` | Se o toast pode ser fechado manualmente |
| `action` | `string` | - | Texto do botão de ação |
| `actionColor` | `string` | `"white"` | Cor do botão de ação |
| `onAction` | `() => void` | - | Callback quando o botão de ação é clicado |

### Métodos do useToast

```typescript
const toast = useToast();

// Métodos principais
toast.success(message: string, options?: ToastOptions);
toast.error(message: string, options?: ToastOptions);
toast.warning(message: string, options?: ToastOptions);
toast.info(message: string, options?: ToastOptions);

// Método genérico
toast.show(options: ToastOptions);

// Fechar toast manualmente
toast.close();
```

## 💡 Exemplos de Uso

### Exemplo 1: Uso Básico

```vue
<script setup lang="ts">
import { useToast } from "@/shared/components/alerts/useToast";

const toast = useToast();

async function saveClient() {
  try {
    await ClientsApiAdapter.create(client);
    toast.success("Cliente criado com sucesso!");
  } catch (error) {
    toast.error("Erro ao criar cliente");
  }
}
</script>
```

### Exemplo 2: Toast com Ação

```vue
<script setup lang="ts">
import { useToast } from "@/shared/components/alerts/useToast";

const toast = useToast();

function showUndoToast() {
  toast.success("Cliente deletado", {
    action: "Desfazer",
    onAction: () => {
      // Lógica para desfazer
      console.log("Desfazer ação");
    },
  });
}
</script>
```

### Exemplo 3: Toast Customizado

```vue
<script setup lang="ts">
import { useToast } from "@/shared/components/alerts/useToast";

const toast = useToast();

function showCustomToast() {
  toast.show({
    message: "Processo concluído com sucesso!",
    type: "success",
    timeout: 6000,
    location: "bottom end",
    variant: "elevated",
    closable: true,
  });
}
</script>
```

### Exemplo 4: Toast com Timeout Personalizado

```vue
<script setup lang="ts">
import { useToast } from "@/shared/components/alerts/useToast";

const toast = useToast();

function showLongToast() {
  toast.info("Este toast permanecerá visível por 10 segundos", {
    timeout: 10000,
  });
}
</script>
```

## 🎨 Posições Disponíveis

- `"top"` - Topo
- `"bottom"` - Fundo
- `"start"` - Esquerda
- `"end"` - Direita
- `"top start"` - Topo esquerda
- `"top end"` - Topo direita (padrão)
- `"bottom start"` - Fundo esquerda
- `"bottom end"` - Fundo direita

## 🔧 Integração

O `ToastProvider` já está incluído no `MainFrame.vue`, então está disponível globalmente em toda a aplicação. Não é necessário adicionar manualmente em cada página.

## 📚 Tipos TypeScript

```typescript
import type { ToastOptions, ToastType } from "@/shared/components/alerts/useToast";

const options: ToastOptions = {
  message: "Minha mensagem",
  type: "success",
  timeout: 5000,
  location: "top end",
  variant: "flat",
  closable: true,
};
```

## 🎯 Boas Práticas

1. **Use mensagens claras e concisas**: Mantenha as mensagens curtas e diretas ao ponto
2. **Escolha o tipo correto**: Use `success` para ações bem-sucedidas, `error` para erros, `warning` para avisos e `info` para informações
3. **Timeout apropriado**: Mensagens curtas (2-4s), mensagens longas ou importantes (5-10s)
4. **Não abuse**: Use toasts para feedback importante, não para cada ação do usuário
5. **Considere a posição**: Use `top end` para feedback de ações, `bottom end` para notificações persistentes

## 🐛 Troubleshooting

### Toast não aparece

- Verifique se o `ToastProvider` está incluído no layout principal (`MainFrame.vue`)
- Certifique-se de que está chamando os métodos do `useToast` corretamente

### Toast aparece mas não fecha

- Verifique se o `timeout` está configurado corretamente
- Certifique-se de que `closable` está como `true` se quiser permitir fechamento manual

## 📝 Notas

- O toast usa o componente `v-snackbar` do Vuetify
- O estado é gerenciado globalmente através do composable `useToast`
- Apenas um toast pode ser exibido por vez (o novo toast substitui o anterior)

