<template>
  <div>
    <h2>Search</h2>
    <v-text-field
      v-model="textSearch"
      label="Text Search"
      prepend-icon="title"
    />
    <v-autocomplete
      v-model="peopleFilter"
      :items="person.people"
      :item-text="fullName"
      :search-input.sync="personSearch"
      hide-selected
      prepend-icon="people"
      item-value="id"
      label="People Search"
      multiple
      small-chips
      deletable-chips
    />
    <v-autocomplete
      v-model="locationFilter"
      :items="location.locations"
      item-text="name"
      :search-input.sync="locationSearch"
      hide-selected
      clearable
      prepend-icon="location_on"
      item-value="id"
      label="Location Search"
    />
    <h2>Results</h2>
    <v-data-table
      :items="moviesResultList"
      :headers="headers"
      :loading="loading"
      :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.taken | formatDate }}</td>
        <td>{{ locationName(props.item.location) }}</td>
        <td class="justify-center layout px-0">
          <v-btn
            icon
            class="red--text"
            :disabled="!props.item.link"
            :href="props.item.link"
            target="_blank"
          >
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
          <v-btn
            icon
            :to="{ name: 'movie-edit', params: { id: props.item.id } }"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            :disabled="!props.item.people || props.item.people.length == 0"
            @click="props.expanded = !props.expanded"
            flat
            round
          >
            <v-icon>people</v-icon>
            <v-icon>expand_more</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
        <v-chip
          small
          v-for="person in peopleDetail(props.item.people)"
          :key="person.id"
        >
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{ person.firstName }} {{ person.lastName }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  created() {
    this.$store.dispatch('movie/searchMovies').then(data => {
      this.moviesResultList = data
      this.loading = false
    })
    this.$store.dispatch('person/fetchPeople')
    this.$store.dispatch('location/fetchLocations')
    this.debounceSearch = _.debounce(this.performSearch, 500)
  },
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Date Taken', value: 'taken' },
        { text: 'Location', value: 'location' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      moviesResultList: [],
      personSearch: null,
      peopleDetails: [],
      peopleFilter: [],
      textSearch: null,
      locationFilter: null,
      locationSearch: null,
      loading: true,
      pagination: { rowsPerPage: 10 }
    }
  },
  watch: {
    peopleFilter: function() {
      this.personSearch = ''
      this.performSearch()
    },
    textSearch: function() {
      this.loading = true
      this.debounceSearch()
    },
    locationFilter: function() {
      this.performSearch()
    }
  },
  methods: {
    performSearch() {
      this.loading = true
      this.$store
        .dispatch('movie/searchMovies', {
          peopleFilter: this.peopleFilter,
          textFilter: this.textSearch,
          locationFilter: this.locationFilter
        })
        .then(data => {
          this.moviesResultList = data
          this.loading = false
        })
    },
    peopleDetail(peopleIds) {
      return peopleIds.map(i =>
        this.person.people.find(person => person.id === i)
      )
    },
    locationName(locationId) {
      if (locationId && this.location.locations.length > 0) {
        const foundLocation = this.location.locations.find(
          location => location.id === locationId
        )
        return foundLocation.name
      }
      return ''
    },
    fullName(person) {
      return person.firstName + ' ' + person.lastName
    }
  },
  computed: {
    ...mapState(['movie', 'person', 'location'])
  }
}
</script>
