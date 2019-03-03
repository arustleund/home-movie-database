<template>
  <div>
    <v-layout></v-layout>
    <v-data-table :items="movie.movies" :headers="headers">
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

export default {
  created() {
    this.$store.dispatch('movie/fetchMovies')
    this.$store.dispatch('person/fetchPeople')
    this.$store.dispatch('location/fetchLocations')
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
      personSearch: null,
      peopleDetails: []
    }
  },
  methods: {
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
    }
  },
  computed: {
    ...mapState(['movie', 'person', 'location'])
  }
}
</script>
