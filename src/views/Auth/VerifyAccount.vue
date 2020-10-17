<template>
  <div class="">
    <div class="row">
      <div class="col-md-12">
        <div
          class="min-vh-100 d-flex justify-content-center align-items-center"
        >
          <b-overlay
            variant="dark"
            show
            class="w-100 min-vh-100"
            rounded="sm"
            blur="2px"
          >
            <template v-slot:overlay>
              <div class="text-center text-white">
                <b-icon
                  icon="gear-fill"
                  font-scale="3"
                  animation="spin"
                ></b-icon>
                <p id="cancel-label" class="mt-4">
                  Verification process in progress, please wait...
                </p>
              </div>
            </template>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['activateAccount'])
  },
  mounted() {
    const token = this.$route.query.token
    this.activateAccount({ token })
      .then((response) => {
        this.$toast.success('Verify email success, please login')
        this.$router.push({ name: 'Login' })
      })
      .catch((err) => {
        this.$toast.error(err.data.message)
        this.$router.push({ name: 'Login' })
      })
  },
  computed: mapState(['socket'])
}
</script>
