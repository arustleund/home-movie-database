<template>
  <div>
    <v-text-field
      v-model="search"
      label="Filter Results"
      clearable
      prepend-inner-icon="search"
    ></v-text-field>
    <v-list>
      <v-list-tile v-for="person in filteredPeople" :key="person.id">
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
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredPeople() {
      const searchUpper = this.search.toUpperCase()
      return this.person.people.filter(p => {
        return (
          p.lastName.toUpperCase().includes(searchUpper) ||
          p.firstName.toUpperCase().includes(searchUpper)
        )
      })
    },
    ...mapState(['person'])
  },
  methods: {
    fullName(person) {
      return person.firstName + ' ' + person.lastName
    }
  }
}
</script>
