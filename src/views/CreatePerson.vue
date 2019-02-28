<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="person.person.firstName"
        ref="firstName"
        label="First Name"
      />
      <v-text-field v-model="person.person.lastName" label="Last Name" />
      <v-btn type="submit" color="primary"
        >{{ this.id ? 'Update' : 'Create' }} Person</v-btn
      >
    </v-form>
    <v-snackbar v-model="submittedSuccessfully" color="success" :timeout="5000">
      Person {{ this.id ? 'Updated' : 'Created' }} Successfully
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
    } else {
      this.$store.dispatch('person/clearPerson')
    }
  },
  data() {
    return {
      submittedSuccessfully: false
    }
  },
  methods: {
    submit() {
      if (this.id) {
        this.$store
          .dispatch('person/updatePerson', this.person.person)
          .then(() => {
            this.submittedSuccessfully = true
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$store
          .dispatch('person/createPerson', this.person.person)
          .then(() => {
            this.submittedSuccessfully = true
            this.$store.dispatch('person/clearPerson').then(() => {
              this.$refs.firstName.focus()
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    ...mapState(['person'])
  }
}
</script>
