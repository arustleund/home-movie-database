<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="location.location.name"
        ref="name"
        label="Location"
      />
      <v-btn type="submit" color="primary"
        >{{ this.id ? 'Update' : 'Create' }} Location</v-btn
      >
    </v-form>
    <v-snackbar v-model="submittedSuccessfully" color="success" :timeout="5000">
      Location {{ this.id ? 'Updated' : 'Created' }} Successfully
      <v-btn dark flat @click="submittedSuccessfully = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['id'],
  created() {
    console.log(this.id)
    if (this.id) {
      this.$store.dispatch('location/fetchLocation', this.id)
    } else {
      this.$store.dispatch('location/clearLocation')
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
          .dispatch('location/updateLocation', this.location.location)
          .then(() => {
            this.submittedSuccessfully = true
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$store
          .dispatch('location/createLocation', this.location.location)
          .then(() => {
            this.submittedSuccessfully = true
            this.$store.dispatch('location/clearLocation').then(() => {
              this.$refs.name.focus()
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    ...mapState(['location'])
  }
}
</script>
