import Vue from 'vue'
import Vuex from 'vuex'
import * as person from '@/store/modules/person.js'
import * as movie from '@/store/modules/movie.js'
import * as tag from '@/store/modules/tag.js'
import * as location from '@/store/modules/location.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    person,
    movie,
    tag,
    location
  },
  state: {},
  mutations: {},
  actions: {}
})
