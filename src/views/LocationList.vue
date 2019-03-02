<template>
  <div>
    <v-layout align-end justify-end>
      <v-btn color="primary" :to="{ name: 'location-create' }"
        >Add New Location</v-btn
      >
    </v-layout>
    <v-text-field
      v-model="search"
      label="Filter Results"
      clearable
      prepend-inner-icon="search"
    ></v-text-field>
    <v-list>
      <v-list-tile
        v-for="location in filteredLocations"
        :key="location.id"
        avatar
      >
        <v-list-tile-avatar>
          <v-icon class="grey lighten-1 white--text">location_on</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ location.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn
            icon
            :to="{ name: 'location-edit', params: { id: location.id } }"
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
    this.$store.dispatch('location/fetchLocations')
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredLocations() {
      return this.location.locations.filter(l => {
        return l.name.toUpperCase().includes(this.search.toUpperCase())
      })
    },
    ...mapState(['location'])
  }
}
</script>
