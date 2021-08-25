import Vue from 'vue';
import VueRouter from 'vue-router';
import Part1 from '@/views/Part1.vue';
import Part2 from '@/views/Part2.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Part1',
      query: {
        page: 1
      }
    }
  },
  {
    path: '/part1',
    name: 'Part1',
    component: Part1
  },
  {
    path: '/part2',
    name: 'Part2',
    component: Part2
  },
];

const router = new VueRouter({
  routes,
});

export default router;
