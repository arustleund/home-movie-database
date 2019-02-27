<template>
  <div>
    <v-text-field
      v-model="search"
      label="Filter Results"
      clearable
      prepend-inner-icon="search"
    ></v-text-field>
    <v-list>
      <v-list-tile v-for="person in filteredPeople" :key="person.id" avatar>
        <v-list-tile-avatar>
          <v-icon class="grey lighten-1 white--text">person</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title
            >{{ person.firstName }} {{ person.lastName }}</v-list-tile-title
          >
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn
            icon
            ripple
            :to="{ name: 'person-edit', params: { id: person.id } }"
          >
            <v-icon color="grey lighten-1">edit</v-icon>
          </v-btn>
        </v-list-tile-action>
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
  }
}
</script>
