import useClientsFilters from "./filters/useClientsFilters"

export default function useClientsPage() {
  const {filters} = useClientsFilters()

  const searchedText = computed(() => filters.search)
  return {
    filters,
    searchedText
  }
}