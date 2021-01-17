import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Store from '@/store/index.js'

import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Home from '@/components/Home.vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const routes = [
    { path: '/', redirect: { name: 'Login' } },
    { path: '/login',
      name: 'Login',
      component: Login,
      meta: { 
        isPublic: true,
        isNotLogin : true 
      }
    },
    { path: '/sign_up',
      name: 'SignUp',
      component: SignUp,
      meta: { 
        isPublic: true,
        isNotLogin : true 
      }
    },
    { path: '/home',
      name: 'Home',
      component: Home
    }
  ]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  // ログイン状態でログイン画面には移行できないようにする
  // 非ログイン時に非Public画面に移行しようとした場合ログイン画面移行
  router.beforeEach((to, from, next) => {
    if(Store.state.auth.accessToken) {
      // ログイン時
      // to.matched.some(page => page.meta.isNotLogin)? next('どこか') : next() <-書き換える
      to.matched.some(page => page.meta.isNotLogin)? next('/search_restaurants') : next();
    } else {
      // 非ログイン時
      if (!to.matched.some(page => page.meta.isPublic)) next('/login')
      next()
    }
  })

  export default router