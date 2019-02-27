import MovieService from '@/services/MovieService.js'

export const namespaced = true

export const state = {
  movies: [],
  movie: {}
}

export const mutations = {
  ADD_MOVIE(state, movie) {
    state.movies.push(movie)
  },
  SET_MOVIES(state, movies) {
    state.movies = movies
  },
  SET_MOVIE(state, movie) {
    state.movie = movie
  }
}

export const actions = {
  createMovie({ commit }, movie) {
    return MovieService.postMovie(movie)
      .then(() => {
        commit('ADD_MOVIE', movie)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchMovies({ commit }) {
    MovieService.getMovies()
      .then(response => {
        commit('SET_MOVIES', response.data)
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  },
  fetchMovie({ commit, getters }, id) {
    var movie = getters.getMovieById(id)
    if (movie) {
      commit('SET_MOVIE', movie)
    } else {
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
}
export const getters = {
  getMovieById: state => id => {
    return state.movies.find(movie => movie.id === id)
  }
}
