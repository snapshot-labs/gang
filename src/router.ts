import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Circle from '@/views/Circle.vue';
import Member from '@/views/Member.vue';

const routes: any[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/gang/:id', name: 'circle', component: Circle },
  { path: '/member/:id', name: 'member', component: Member }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.params.retainScrollPosition) return {};
    if (to.hash) {
      const position = { selector: to.hash };
      return { el: position };
    }
    return { top: 0 };
  }
});

export default router;
