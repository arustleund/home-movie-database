<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="person.person.firstName"
        ref="firstName"
        label="First Name"
      />
      <v-text-field v-model="person.person.lastName" label="Last Name" />
      <v-btn type="submit" color="primary">submit</v-btn>
    </v-form>
    <v-snackbar v-model="submittedSuccessfully" color="success" :timeout="5000"
      >Person Created Successfully
      <v-btn dark flat @click="submittedSuccessfully = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['id'],
  created() {
    if (this.id) {
      this.$store.dispatch('person/fetchPerson', this.id)
    }
  },
  data() {
    return {
      submittedSuccessfully: false
    }
  },
  methods: {
    submit() {
      this.$store
        .dispatch('person/createPerson', this.person.person)
        .then(() => {
          //this.person.person = { id: null, firstName: '', lastName: '' }
          this.submittedSuccessfully = true
          this.$refs.firstName.focus()
        })
        .catch(() => {})
    }
  },
  computed: {
    ...mapState(['person'])
  }
}
</script>

<style scoped></style>
