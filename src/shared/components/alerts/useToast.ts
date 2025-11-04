import { ref } from "vue";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  message: string;
  type?: ToastType;
  timeout?: number;
  location?:
    | "top"
    | "bottom"
    | "start"
    | "end"
    | "center"
    | "top start"
    | "top end"
    | "bottom start"
    | "bottom end"
    | "center start"
    | "center end";
  variant?: "text" | "flat" | "tonal" | "outlined" | "plain" | "elevated";
  closable?: boolean;
  action?: string;
  actionColor?: string;
  onAction?: () => void;
}

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
  timeout: number;
  location: ToastOptions["location"];
  variant: ToastOptions["variant"];
  closable: boolean;
  action?: string;
  actionColor?: string;
  onAction?: () => void;
}

const toastState = ref<ToastState>({
  show: false,
  message: "",
  type: "info",
  timeout: 4000,
  location: "top end",
  variant: "flat",
  closable: true,
  action: undefined,
  actionColor: undefined,
  onAction: undefined,
});

/**
 * Composable para gerenciar notificações toast
 *
 * @example
 * const toast = useToast();
 * toast.success("Cliente criado com sucesso!");
 * toast.error("Erro ao criar cliente");
 * toast.warning("Atenção: dados incompletos");
 * toast.info("Processando...");
 */
export function useToast() {
  function show(options: ToastOptions) {
    toastState.value = {
      show: true,
      message: options.message,
      type: options.type || "info",
      timeout: options.timeout ?? 3000,
      location: options.location || "top end",
      variant: options.variant || "flat",
      closable: true,
      action: options.action,
      actionColor: options.actionColor,
      onAction: options.onAction,
    };
  }

  function success(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    show({ ...options, message, type: "success" });
  }

  function error(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    show({ ...options, message, type: "error" });
  }

  function warning(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    show({ ...options, message, type: "warning" });
  }

  function info(message: string, options?: Omit<ToastOptions, "message" | "type">) {
    show({ ...options, message, type: "info" });
  }

  function close() {
    toastState.value.show = false;
  }

  return {
    show,
    success,
    error,
    warning,
    info,
    close,
    toastState,
  };
}
