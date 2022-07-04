import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VCalendar from 'v-calendar';
import Vuex from 'vuex';
import Loading from 'vue-loading-overlay';
import store from './store';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import filters from './filters';
import router from './router';
import './plugins/gtm';

Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);
Vue.use(Vuex);
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.config.productionTip = false;
Vue.filter('currency', filters);
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
