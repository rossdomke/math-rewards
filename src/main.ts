import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

interface Problem {
  TopNumber: number;
  BottomNumber: number;
  Operator: string;
  UserAnswer: number;
}

new Vue({
  data() {
    return {
      answerHistory: [] as Problem[],
    };
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
