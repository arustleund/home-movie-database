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
  getTags() {
    return apiClient.get('/tags')
  }
}
