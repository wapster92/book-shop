import Vue from 'vue'
import Vuex from 'vuex'
import keys from '../keys/keys'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    books: [],
    checkedCat: [],
    page: 1,
    next: false
  },
  mutations: {
    ADD_CATEGORIES(state, payload) {
      state.categories = payload
    },
    ADD_BOOKS(state, payload) {
      payload.forEach(el => {
        state.books.push(el)
      })
    },
    ADD_CHECKEDCAT(state, payload) {
      const index = state.checkedCat.indexOf(payload)
      if(index < 0) {
        state.checkedCat.push(payload)
      } else {
        state.checkedCat.splice(index, 1)
      }
    },
    CHANGE_NEXT (state, payload) {
      state.next = payload
    },
    CHANGE_PAGE (state) {
      state.page++
    },
    RESET(state) {
      state.books = []
      state.page = 1
    }
  },
  actions: {
    async GET_CATEGORIES ({commit}) {
      try {
        const res = await axios.post(`${keys.API}/book/categories`,{
          headers: {
            'Content-Type': 'application/json'
          }
        })
        commit('ADD_CATEGORIES', res.data.data.list)
      } catch (e) {
        console.error(e)
      }

    },
    async GET_BOOKS ({commit, state}) {
      if(state.checkedCat.length > 0) {
        try {
          const res = await axios({
            method: 'POST',
            url: `${keys.API}/book/list`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              categories: state.checkedCat,
              page: state.page
            }
          })
          commit('ADD_BOOKS', res.data.data.list)
          commit('CHANGE_NEXT', res.data.data.next)
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  modules: {
  }
})
