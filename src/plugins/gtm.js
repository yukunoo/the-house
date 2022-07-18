import VueGtm from '@gtm-support/vue2-gtm';
import Vue from 'vue';
import router from '../router/index';

Vue.use(VueGtm, {
  // container id
  id: 'GTM-NV9MMJV',
  // enable track or not (optional)
  enabled: process.env.NODE_ENV === 'production',
  ignoredViews: ['404'],
  // vueRouter: router,
  // display console logs debugs or not (optional)
  debug: false,
});
