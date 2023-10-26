import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import UserPanel from '../components/UserPanel.vue';
import UserProfile from '../components/UserProfile.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name:'UserPanel', component: UserPanel },
  { path: '/user/:id', name: 'userProfile', component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
