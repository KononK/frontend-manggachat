import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/LoginPage'
import Register from '../views/Auth/RegisterPage'
import ForgotPassword from '../views/Auth/ForgotPasswordPage'
import VerifyAccount from '../views/Auth/VerifyAccount.vue'
import ResetPassword from '../views/Auth/ResetPasswordPage'
import Home from '../views/Home'
import Dashboard from '../views/Home/HomePage'
import Setting from '../views/Home/SettingPage'
import Masuk from '../views/Masuk.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [ //
  {
    path: '/',
    name: 'Root',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresLogin: true
    },
    redirect: {
      name: 'Dashboard'
    },
    children: [ //
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'private',
        name: 'Private',
        component: Dashboard
      },
      {
        path: 'group',
        name: 'Group',
        component: Dashboard
      },
      {
        path: 'friends',
        name: 'Friends',
        component: Dashboard
      },
      {
        path: 'users',
        name: 'Users',
        component: Dashboard
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresVisit: true
    }
  },
  {
    path: '/masuk',
    name: 'Masuk',
    component: Masuk
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresVisit: true
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      requiresVisit: true
    }
  },
  {
    path: '/login/verify-account',
    name: 'VerifyAccount',
    component: VerifyAccount,
    meta: {
      requiresVisit: true
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      requiresVisit: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.getters['auth/isLogin']) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisit)) {
    if (store.getters['auth/isLogin']) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
