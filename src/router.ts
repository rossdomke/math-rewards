import Vue from 'vue';
import Router from 'vue-router';
import Game from './views/Game.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: Game,
    },
    {
      path: '/settings',
      name: 'setting',
      component: Settings,
    },
  ],
});
