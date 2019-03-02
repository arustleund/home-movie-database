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
  getLocations() {
    return apiClient.get('/locations')
  },
  getLocation(id) {
    return apiClient.get('/locations/' + id)
  },
  createLocation(location) {
    return apiClient.post('/locations', location)
  },
  updateLocation(location) {
    return apiClient.put('/locations/' + location.id, location)
  }
}
