<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="movie.title" ref="title" label="Title" />
      <v-text-field v-model="movie.description" label="Description" />
      <v-text-field
        v-model="movie.link"
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
          v-model="movie.date"
          label="Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          ref="picker"
          v-model="movie.date"
          no-title
          scrollable
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-autocomplete
        v-model="movie.people"
        :items="person.people"
        :item-text="fullName"
        prepend-icon="people"
        item-value="id"
        label="People"
        multiple
        small-chips
        deletable-chips
      ></v-autocomplete>
      <v-btn type="submit" color="primary">submit</v-btn>
    </v-form>
    <v-snackbar v-model="submittedSuccessfully" color="success" :timeout="5000"
      >Movie Created Successfully
      <v-btn dark flat @click="submittedSuccessfully = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      movie: this.createFreshMovie(),
      submittedSuccessfully: false
    }
  },
  created() {
    this.$store.dispatch('person/fetchPeople')
  },
  methods: {
    submit() {
      this.$store
        .dispatch('movie/createMovie', this.movie)
        .then(() => {
          this.movie = this.createFreshMovie()
          this.submittedSuccessfully = true
          this.$refs.title.focus()
        })
        .catch(error => {
          console.log(error)
        })
    },
    createFreshMovie() {
      return {
        id: null,
        title: '',
        description: '',
        link: '',
        date: null,
        people: []
      }
    },
    fullName(person) {
      return person.firstName + ' ' + person.lastName
    }
  },
  computed: {
    ...mapState(['person'])
  }
}
</script>

<style scoped></style>
