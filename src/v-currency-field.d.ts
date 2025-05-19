declare module "v-currency-field" {
  import type { Plugin } from "vue";

  export interface VCurrencyFieldPluginOptions {
    locale?: string;
    currency?: string;
    decimalLength?: number;
    autoDecimalMode?: boolean;
    min?: number | null;
    max?: number | null;
    defaultValue?: number;
    valueAsInteger?: boolean;
    allowNegative?: boolean;
  }

  const VCurrencyField: Plugin;
  export default VCurrencyField;
}
