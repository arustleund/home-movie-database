<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="movie.movie.title" ref="title" label="Title" />
      <v-text-field v-model="movie.movie.description" label="Description" />
      <v-text-field
        v-model="movie.movie.link"
        prepend-icon="link"
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
        v-model="movie.movie.people"
        :items="person.people"
        :item-text="fullName"
        prepend-icon="people"
        item-value="id"
        label="People"
        multiple
        small-chips
        deletable-chips
      ></v-autocomplete>
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
    if (this.id) {
      this.$store.dispatch('movie/fetchMovie', this.id)
    } else {
      this.$store.dispatch('movie/clearMovie')
    }
  },
  data() {
    return {
      menu: false,
      submittedSuccessfully: false
    }
  },
  methods: {
    submit() {
      if (this.id) {
        this.$store
          .dispatch('movie/updateMovie', this.movie.movie)
          .then(() => {
            this.submittedSuccessfully = true
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$store
          .dispatch('movie/createMovie', this.movie.movie)
          .then(() => {
            this.submittedSuccessfully = true
            this.$store.dispatch('movie/clearMovie').then(() => {
              this.$refs.title.focus()
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
    ...mapState(['person', 'movie'])
  }
}
</script>
