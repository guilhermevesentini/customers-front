// /**
//  * router/index.ts
//  *
//  * Automatic routes for `./src/pages/*.vue`
//  */

// // Composables
// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: setupLayouts(routes),
// })

// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (!localStorage.getItem('vuetify:dynamic-reload')) {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     } else {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     }
//   } else {
//     console.error(err)
//   }
// })

// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })

// export default router

// router/index.ts
<<<<<<< HEAD
import { clientsRouter } from "@/modules/Clients/router/ClientsRouter";
import DashboardPage from "@/modules/Dashboard/DashboardPage.vue";
import Default from "@/shared/layouts/default.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Default,
    children: [
      { path: "", redirect: "/dashboard" }, // redireciona / para /dashboard
      { path: "dashboard", component: DashboardPage },
      ...clientsRouter,
    ],
  },
];
=======
import { clientsRouter } from '@/modules/Clients/router/ClientsRouter';
import DashboardPage from '@/modules/Dashboard/DashboardPage.vue';
import Default from '@/shared/layouts/default.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Default,
    children: [
      { path: '', redirect: '/dashboard' }, // redireciona / para /dashboard
      { path: 'dashboard', component: DashboardPage },
      ...clientsRouter,
    ],
  },
]
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

const router = createRouter({
  history: createWebHistory(),
  routes,
<<<<<<< HEAD
});
=======
})
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

export default router;
