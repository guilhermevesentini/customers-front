import { reactive } from "vue";

const filters = reactive({
  search: "",
  month: new Date(),
});

export default function useClientsFilters() {
  return {
    filters,
  };
}
