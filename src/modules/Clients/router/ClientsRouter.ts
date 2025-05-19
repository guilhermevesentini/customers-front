<<<<<<< HEAD
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
=======
import ClientDetails from '../views/details/ClientDetails.vue';
import ClientForm from '../widgets/form/ClientForm.vue';
import ClientsPage from '../ClientsPage.vue';

export const clientsRouter = [
  {
    path: '/clients',
    component: ClientsPage,
  },
  {
    path: '/clients/create',
    component: ClientForm,
  },
  {
    path: '/clients/client/:id',
    component: ClientDetails,
  },
  {
    path: '/clients/edit/:id',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    component: ClientForm,
  },
];
