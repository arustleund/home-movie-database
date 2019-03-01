import TagService from '@/services/TagService.js'

export const namespaced = true

export const state = {
  tags: []
}

export const mutations = {
  SET_TAGS(state, tags) {
    state.tags = tags
  }
}

export const actions = {
  fetchTags({ commit }) {
    TagService.getTags()
      .then(response => {
        commit('SET_TAGS', response.data)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  }
}
