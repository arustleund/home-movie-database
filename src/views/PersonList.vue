<template>
  <div>
    <v-list>
      <v-list-tile v-for="person in person.people" :key="person.id">
        <v-list-tile-content>
          <v-list-tile-title v-text="fullName(person)"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('person/fetchPeople')
  },
  computed: {
    ...mapState(['person'])
  },
  methods: {
    fullName(person) {
      return person.firstName + ' ' + person.lastName
    }
  }
}
</script>
