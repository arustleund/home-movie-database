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
  getPeople() {
    return apiClient.get('/people?_sort=lastName,firstName')
  },
  getPerson(id) {
    return apiClient.get('/people/' + id)
  },
  createPerson(person) {
    return apiClient.post('/people', person)
  },
  updatePerson(person) {
    return apiClient.put('/people/' + person.id, person)
  }
}
