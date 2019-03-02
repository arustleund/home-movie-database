import LocationService from '@/services/LocationService.js'

export const namespaced = true

export const state = {
  locations: [],
  location: {}
}

export const mutations = {
  ADD_LOCATION(state, location) {
    state.locations.push(location)
  },
  SET_LOCATIONS(state, locations) {
    state.locations = locations
  },
  SET_LOCATION(state, location) {
    state.location = location
  }
}

export const actions = {
  clearLocation({ commit }) {
    commit('SET_LOCATION', {})
  },
  createLocation({ commit }, location) {
    return LocationService.createLocation(location)
      .then(() => {
        commit('ADD_LOCATION', location)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  updateLocation({ commit }, location) {
    return LocationService.updateLocation(location)
      .then(() => {
        commit('SET_LOCATION', location)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchLocations({ commit }) {
    LocationService.getLocations()
      .then(response => {
        commit('SET_LOCATIONS', response.data)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchLocation({ commit, getters }, id) {
    var location = getters.getLocationById(id)
    if (location) {
      commit('SET_LOCATION', location)
    } else {
      LocationService.getLocation(id)
        .then(response => {
          commit('SET_LOCATION', response.data)
        })
        .catch(error => {
          console.log(error)
          throw error
        })
    }
  }
}
export const getters = {
  getLocationById: state => id => {
    return state.locations.find(location => location.id === id)
  }
}
