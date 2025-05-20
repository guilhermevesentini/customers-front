import ClientDetails from "../views/details/ClientDetails.vue";
import ClientForm from "../widgets/form/ClientForm.vue";
import ClientsPage from "../ClientsPage.vue";

export const clientsRouter = [
  {
    path: "/clients",
    component: ClientsPage,
  },
  {
    path: "/clients/create",
    component: ClientForm,
  },
  {
    path: "/clients/client/:id",
    component: ClientDetails,
  },
  {
    path: "/clients/edit/:id",
    component: ClientForm,
  },
];
