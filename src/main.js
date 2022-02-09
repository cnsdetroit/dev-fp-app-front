import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import vmodal from 'vue-js-modal'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCog,
  faList,
  faHome,
  faUser,
  faUsers,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import vuetify from './plugins/vuetify';
library.add(faCog, faList, faHome, faUser, faUsers, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false
Vue.use(vmodal)
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')