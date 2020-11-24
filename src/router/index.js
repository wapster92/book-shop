import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if(to.query.cat) {

        to.query.cat.split(',').forEach(el => {
          store.commit('ADD_CHECKEDCAT', Number(el))
        })
        if(to.query.search) {
          store.commit('CHANGE_SEARCH', to.query.search)
        }
        store.dispatch('GET_BOOKS')
        next()
      } else {
        next ()
      }

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
