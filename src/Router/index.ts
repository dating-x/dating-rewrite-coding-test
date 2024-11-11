import { createRouter, createWebHistory } from 'vue-router';

import themeRoutes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: themeRoutes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
