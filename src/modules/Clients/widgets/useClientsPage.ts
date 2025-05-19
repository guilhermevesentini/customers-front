<<<<<<< HEAD
import useClientsFilters from "./filters/useClientsFilters";

export default function useClientsPage() {
  const { filters } = useClientsFilters();

  const searchedText = computed(() => filters.search);
  return {
    filters,
    searchedText,
  };
}
=======
import useClientsFilters from "./filters/useClientsFilters"

export default function useClientsPage() {
  const {filters} = useClientsFilters()

  const searchedText = computed(() => filters.search)
  return {
    filters,
    searchedText
  }
}
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
