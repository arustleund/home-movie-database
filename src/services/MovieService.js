import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://www.rustleund.com/homemovies', //process.env.VUE_APP_MOVIES_API_URL',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getMovies() {
    return apiClient.get('/movies')
  },
  getMovie(id) {
    return apiClient.get('/movies/' + id)
  },
  createMovie(movie) {
    return apiClient.post('/movies', movie)
  },
  updateMovie(movie) {
    return apiClient.put('/movies/' + movie.id, movie)
  }
}
