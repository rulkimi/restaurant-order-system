import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/menus',
    component: () => import('../views/menus/MenusLists.vue'),
  },
  {
    path: '/menus/:id',
    component: () => import('../views/menus/MenuDetails.vue'),
  },
  {
    path: '/create',
    component: () => import('../views/menus/MenuCreation.vue'),
  },
  {
    path: '/orders',
    component: () => import('../views/orders/OrdersPlaced.vue'),
  },
  {
    path: '/:notFound(.*)',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
