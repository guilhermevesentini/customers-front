<<<<<<< HEAD
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
=======
declare module 'v-currency-field' {
  import type { Plugin } from 'vue'

  export interface VCurrencyFieldPluginOptions {
    locale?: string
    currency?: string
    decimalLength?: number
    autoDecimalMode?: boolean
    min?: number | null
    max?: number | null
    defaultValue?: number
    valueAsInteger?: boolean
    allowNegative?: boolean
  }

  const VCurrencyField: Plugin
  export default VCurrencyField
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
}
