<template>
  <div>
    <v-data-table :items="movie.movies" :headers="headers">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.date | formatDate }}</td>
        <td>
          <v-btn
            icon
            class="red--text"
            v-if="props.item.link"
            :href="props.item.link"
            target="_blank"
          >
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
          <v-btn
            v-if="props.item.people.length > 0"
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
  },
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      peopleDetails: []
    }
  },
  methods: {
    peopleDetail(peopleIds) {
      return peopleIds.map(i =>
        this.person.people.find(person => person.id === i)
      )
    }
  },
  computed: {
    ...mapState(['movie', 'person'])
  }
}
</script>
