import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

import InfiniteLoading from 'vue-infinite-loading'
import VueTimeago from 'vue-timeago'
import VueToast from 'vue-toast-notification'
import swal from './components/mixins/swal'
import logout from './components/mixins/logout'
import VueSweetalert2 from 'vue-sweetalert2'
import VueChatScroll from 'vue-chat-scroll'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'
import './GlobalComponents.js'

Vue.use(VueToast, {
  position: 'top-right'
})
Vue.use(VueChatScroll)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.use(InfiniteLoading)

Vue.mixin(swal)
Vue.mixin(logout)
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
