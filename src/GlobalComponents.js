import Vue from 'vue'

// atoms
Vue.component('g-image',
  () => import('./components/atoms/image.vue')
)
Vue.component('g-button',
  () => import('./components/atoms/button.vue')
)
Vue.component('g-profile',
  () => import('./components/atoms/ProfileImage.vue')
)
