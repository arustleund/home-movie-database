import PersonService from '@/services/PersonService.js'

export const namespaced = true

export const state = {
  people: [],
  person: {}
}

export const mutations = {
  ADD_PERSON(state, person) {
    state.people.push(person)
  },
  SET_PEOPLE(state, people) {
    state.people = people
  },
  SET_PERSON(state, person) {
    state.person = person
  }
}

export const actions = {
  clearPerson({ commit }) {
    commit('SET_PERSON', {})
  },
  createPerson({ commit }, person) {
    return PersonService.createPerson(person)
      .then(() => {
        commit('ADD_PERSON', person)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  updatePerson({ commit }, person) {
    return PersonService.updatePerson(person)
      .then(() => {
        commit('SET_PERSON', person)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchPeople({ commit }) {
    PersonService.getPeople()
      .then(response => {
        commit('SET_PEOPLE', response.data)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchPerson({ commit, getters }, id) {
    var person = getters.getPersonById(id)
    if (person) {
      commit('SET_PERSON', person)
    } else {
      PersonService.getPerson(id)
        .then(response => {
          commit('SET_PERSON', response.data)
        })
        .catch(error => {
          console.log(error)
          throw error
        })
    }
  }
}
export const getters = {
  getPersonById: state => id => {
    return state.people.find(person => person.id === id)
  }
}
