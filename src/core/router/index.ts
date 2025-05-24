import { clientsRouter } from "@/modules/Clients/router/ClientsRouter";
import DashboardPage from "@/modules/Dashboard/DashboardPage.vue";
import MainFrame from "@/shared/layouts/MainFrame.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainFrame,
    children: [
      { path: "", redirect: "/dashboard" },
      { path: "dashboard", component: DashboardPage },
      ...clientsRouter,
      { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
