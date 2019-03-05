import MovieService from '@/services/MovieService.js'

export const namespaced = true

export const state = {
  movie: {}
}

export const mutations = {
  SET_MOVIE(state, movie) {
    state.movie = movie
  }
}

export const actions = {
  clearMovie({ commit }) {
    commit('SET_MOVIE', {})
  },
  createMovie(ignore, movie) {
    return MovieService.createMovie(movie).catch(error => {
      console.log(error)
      throw error
    })
  },
  updateMovie({ commit }, movie) {
    return MovieService.updateMovie(movie)
      .then(() => {
        commit('SET_MOVIE', movie)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  searchMovies(ignore, parameters) {
    let peopleFilter = parameters ? parameters.peopleFilter : null
    let textFilter = parameters ? parameters.textFilter : null
    return MovieService.searchMovies(peopleFilter, textFilter)
      .then(response => {
        if (response.status == 404) {
          return []
        }
        return response.data
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchMovie({ commit }, id) {
    MovieService.getMovie(id)
      .then(response => {
        commit('SET_MOVIE', response.data)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  }
}
