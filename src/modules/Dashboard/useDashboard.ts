import { useAppStore } from "@/core/stores/appStore";
import useFilterDashboard from "./widgets/filters/useFilterDashboard";
import { EStatus } from "@/core/enums/enums";

export default function useDashboard() {
  const appStore = useAppStore();
  const { clients } = storeToRefs(appStore);

  const { filters } = useFilterDashboard();

  const filteredProducts = computed(() => {
    return (
      clients.value.flatMap((client) =>
        client.products
          .filter((product) => {
            const startDate = new Date(product.start);
            const endDate = new Date(product.end);

            const selected = filters.selectedMonth;

            const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1);
            const monthEnd = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);

            const matchesMonth = startDate <= monthEnd && endDate >= monthStart;

            const matchesStatus =
              !filters.status || String(product.status) === String(filters.status);

            const matchesTipo = !filters.tipo || product.tipo === filters.tipo;

            const matchesCompany = !filters.company || product.company === filters.company;

            return matchesMonth && matchesStatus && matchesTipo && matchesCompany;
          })
          .map((product) => ({
            ...product,
            clientId: client.id,
            client,
          }))
          .sort((a, b) => {
            const statusOrder = {
              [EStatus.pending]: 1,
              [EStatus.active]: 2,
              [EStatus.inactive]: 3,
            };

            return statusOrder[a.status as EStatus] - statusOrder[b.status as EStatus];
          }),
      ) || []
    );
  });

  return { filteredProducts, appStore, clients };
}
