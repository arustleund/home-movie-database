import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_MOVIES_API_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPeople() {
    return apiClient.get('/people')
  },
  getPerson(id) {
    return apiClient.get('/people/' + id)
  },
  postPerson(person) {
    return apiClient.post('/people', person)
  }
}
