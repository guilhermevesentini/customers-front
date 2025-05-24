const filters = reactive({
  selectedMonth: new Date(),
  status: null,
  tipo: null,
  company: null,
});

export default function useFilterDashboard() {
  return {
    filters,
  };
}
