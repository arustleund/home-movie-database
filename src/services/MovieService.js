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
  searchMovies(peopleFilter, textFilter) {
    console.log('performing search ' + peopleFilter + ' ' + textFilter)
    var url = '/movies/search?'
    if (peopleFilter && peopleFilter.length > 0) {
      url += 'people='
      url += peopleFilter.join()
      url += '&'
    }
    if (textFilter) {
      url += 'text=' + encodeURIComponent(textFilter) + '&'
    }
    return apiClient.get(url, {
      validateStatus: function(status) {
        return status < 500 // Reject only if the status code is greater than or equal to 500
      }
    })
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
