import { clientsRouter } from "@/modules/Clients/router/ClientsRouter";
import DashboardPage from "@/modules/Dashboard/DashboardPage.vue";
import MainFrame from "@/shared/layouts/MainFrame.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainFrame,
    children: [
      { path: "", redirect: "/dashboard" },
      { path: "dashboard", component: DashboardPage },
      { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
      ...clientsRouter,
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
