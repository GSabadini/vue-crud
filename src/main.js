// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { dateFormatBRLocale } from './filters/date-format'
import { truncation } from './filters/truncation'
import { sexFormat } from './filters/sex-format'
import VueSweetalert2 from 'vue-sweetalert2'
import Env from '../.env.example'

Vue.filter('dateFormatBRLocale', dateFormatBRLocale)
Vue.filter('truncation', truncation)
Vue.filter('sexFormat', sexFormat)

Vue.use(Env)
Vue.use(VueIziToast)
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false
Vue.http.options.root = Vue.env.BASE_API_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
