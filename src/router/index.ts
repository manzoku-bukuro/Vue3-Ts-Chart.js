import { createRouter, createWebHistory } from 'vue-router'
import Steps from '@/components/pages/Steps.vue';
import Heart from '@/components/pages/Heart.vue';
import Sleep from '@/components/pages/Sleep.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/steps',
    },
    {
      path: '/steps',
      name: 'Steps',
      component: Steps,
    },
    {
      path: '/heart',
      name: 'Heart',
      component: Heart,
    },
    {
      path: '/sleep',
      name: 'Sleep',
      component: Sleep,
    },
  ]
})

export default router
