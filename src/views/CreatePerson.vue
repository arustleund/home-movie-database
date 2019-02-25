<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="person.firstName"
        ref="firstName"
        label="First Name"
      />
      <v-text-field v-model="person.lastName" label="Last Name" />
      <v-btn type="submit" color="primary">submit</v-btn>
    </v-form>
    <v-snackbar v-model="submittedSuccessfully" color="success" timeout="5000"
      >Person Created Successfully
      <v-btn dark flat @click="submittedSuccessfully = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: { id: null, firstName: '', lastName: '' },
      submittedSuccessfully: false
    }
  },
  methods: {
    submit() {
      this.$store
        .dispatch('person/createPerson', this.person)
        .then(() => {
          this.person = { id: null, firstName: '', lastName: '' }
          this.submittedSuccessfully = true
          this.$refs.firstName.focus()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped></style>
