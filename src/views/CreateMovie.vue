<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="movie.movie.title"
        ref="title"
        prepend-icon="title"
        label="Title"
      />
      <v-text-field
        v-model="movie.movie.description"
        prepend-icon="description"
        label="Description"
      />
      <v-text-field
        v-model="movie.movie.link"
        prepend-icon="mdi-youtube"
        label="YouTube Link"
      />
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="movie.movie.taken"
          label="Date Taken"
          prepend-icon="event"
          clearable
          readonly
        ></v-text-field>
        <v-date-picker
          ref="picker"
          v-model="movie.movie.taken"
          no-title
          scrollable
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-autocomplete
        v-model="movie.movie.location"
        :items="location.locations"
        item-text="name"
        :search-input.sync="locationSearch"
        hide-selected
        clearable
        prepend-icon="location_on"
        item-value="id"
        label="Location"
      ></v-autocomplete>
      <v-autocomplete
        v-model="movie.movie.people"
        :items="person.people"
        :item-text="fullName"
        :search-input.sync="personSearch"
        hide-selected
        prepend-icon="people"
        item-value="id"
        label="People"
        multiple
        small-chips
        deletable-chips
      ></v-autocomplete>
      <v-combobox
        v-model="movie.movie.tags"
        :items="tag.tags"
        :search-input.sync="tagSearch"
        item-text="name"
        label="Add or Create Tags"
        item-value="name"
        hide-selected
        prepend-icon="local_offer"
        multiple
        small-chips
        deletable-chips
      >
        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                No results matching "
                <strong>{{ tagSearch }}</strong
                >". Press <kbd>enter</kbd> to create a new one
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-combobox>
      <v-btn type="submit" color="primary"
        >{{ this.id ? 'Update' : 'Create' }} Movie</v-btn
      >
    </v-form>
    <v-snackbar v-model="submittedSuccessfully" color="success" :timeout="5000">
      Movie {{ this.id ? 'Updated' : 'Created' }} Successfully
      <v-btn dark flat @click="submittedSuccessfully = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['id'],
  created() {
    this.$store.dispatch('person/fetchPeople')
    this.$store.dispatch('location/fetchLocations')
    this.$store.dispatch('tag/fetchTags')
    if (this.id) {
      this.$store.dispatch('movie/fetchMovie', this.id)
    } else {
      this.$store.dispatch('movie/clearMovie')
    }
  },
  watch: {
    'movie.movie.people': function() {
      this.personSearch = ''
    },
    'movie.movie.tags': function() {
      this.tagSearch = ''
    }
  },
  data() {
    return {
      tagSearch: null,
      locationSearch: null,
      menu: false,
      personSearch: null,
      submittedSuccessfully: false
    }
  },
  methods: {
    submit() {
      const movieToSave = Object.assign({}, this.movie.movie)
      if (this.movie.movie.tags) {
        movieToSave.tags = this.movie.movie.tags.map(movieTag => {
          var tagToSave = this.tag.tags.find(t => t.name === movieTag)
          if (tagToSave) {
            return tagToSave
          }
          return movieTag
        })
      }
      if (this.id) {
        this.$store
          .dispatch('movie/updateMovie', movieToSave)
          .then(() => {
            this.submittedSuccessfully = true
            this.$store.dispatch('tag/fetchTags')
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$store
          .dispatch('movie/createMovie', movieToSave)
          .then(() => {
            this.submittedSuccessfully = true
            this.$store.dispatch('movie/clearMovie').then(() => {
              this.$store.dispatch('tag/fetchTags').then(() => {
                this.$refs.title.focus()
              })
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fullName(person) {
      return person.firstName + ' ' + person.lastName
    }
  },
  computed: {
    ...mapState(['person', 'movie', 'tag', 'location'])
  }
}
</script>
