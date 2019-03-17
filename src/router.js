import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Ingress from './views/Ingress.vue';
import Admin from './views/Admin.vue';
import Error404 from './views/Error.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/paises',
      name: 'ingress',
      component: Ingress,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '*',
      name: 'error404',
      component: Error404,
    },
  ],
});
