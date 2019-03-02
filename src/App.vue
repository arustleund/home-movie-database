<template>
  <v-app>
    <v-navigation-drawer app fixed clipped v-model="drawer">
      <v-list>
        <v-list-tile to="/" @click="title = 'Home Movies Database'">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/person/create" @click="title = 'Add Person'">
          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add Person</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/person/list" @click="title = 'People'">
          <v-list-tile-action>
            <v-icon>group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>People</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/location/list" @click="title = 'Locations'">
          <v-list-tile-action>
            <v-icon>location_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Locations</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/movie/create" @click="title = 'Add Movie'">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add Movie</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/movie/list" @click="title = 'Movies'">
          <v-list-tile-action>
            <v-icon>movie</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Movies</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view :key="$route.fullPath"></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: null,
      title: 'Home Movies Database'
    }
  }
}
</script>
