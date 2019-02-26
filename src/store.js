import Vue from 'vue'
import Vuex from 'vuex'
import * as person from '@/store/modules/person.js'
import * as movie from '@/store/modules/movie.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    person,
    movie
  },
  state: {},
  mutations: {},
  actions: {}
})
