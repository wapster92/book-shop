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
    next: false,
    load: false,
    search: ''
  },
  mutations: {
    CHANGE_SEARCH(state, payload) {
      state.search = payload
    },
    ADD_CATEGORIES(state, payload) {
      state.categories = [...payload]
    },
    ADD_BOOKS(state, payload) {
      state.books = [...state.books, ...payload]
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
      if (state.next) {
        state.page++
      }
    },
    RESET(state) {
      state.books = []
      state.page = 1
    },
    CHANGE_LOAD(state, payload) {
      state.load = payload
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
          commit('CHANGE_LOAD', true)
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
          commit('CHANGE_LOAD', false)
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  modules: {
  }
})
