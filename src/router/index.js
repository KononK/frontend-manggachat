import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/LoginPage'
import Register from '../views/Auth/RegisterPage'
import ForgotPassword from '../views/Auth/ForgotPasswordPage'
import VerifyAccount from '../views/Auth/VerifyAccount.vue'
import ResetPassword from '../views/Auth/ResetPasswordPage'
import Home from '../views/Home'
import Setting from '../views/Home/SettingPage'
import Dashboard from '../views/Home/HomePage'
import Private from '../views/Home/PrivatePage'
import Group from '../views/Home/GroupPage'
import Friends from '../views/Home/FriendPage'
import Users from '../views/Home/UserPage'

import store from '../store'

Vue.use(VueRouter)

const routes = [ //
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'Login'
    }
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
        component: Private
      },
      {
        path: 'group',
        name: 'Group',
        component: Group
      },
      {
        path: 'friends',
        name: 'Friends',
        component: Friends
      },
      {
        path: 'users',
        name: 'Users',
        component: Users
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
