import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreatePerson from '@/views/CreatePerson.vue'
import PersonList from '@/views/PersonList.vue'
import CreateMovie from '@/views/CreateMovie.vue'
import MovieList from '@/views/MovieList.vue'
import LocationList from '@/views/LocationList.vue'
import LocationDetail from '@/views/LocationDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/person/create',
      name: 'person-create',
      component: CreatePerson
    },
    {
      path: '/person/list',
      name: 'people',
      component: PersonList
    },
    {
      path: '/person/edit/:id',
      name: 'person-edit',
      component: CreatePerson,
      props: true
    },
    {
      path: '/movie/create',
      name: 'movie-create',
      component: CreateMovie
    },
    {
      path: '/movie/list',
      name: 'movies',
      component: MovieList
    },
    {
      path: '/movie/edit/:id',
      name: 'movie-edit',
      component: CreateMovie,
      props: true
    },
    {
      path: '/location/list',
      name: 'locations',
      component: LocationList
    },
    {
      path: '/location/edit/:id',
      name: 'location-edit',
      component: LocationDetail,
      props: true
    },
    {
      path: '/location/create',
      name: 'location-create',
      component: LocationDetail
    }
  ]
})
