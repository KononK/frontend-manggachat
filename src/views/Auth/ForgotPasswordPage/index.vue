<template>
  <CardAuth
    title="Forgot Password"
    needBack
    description="You’ll get messages soon on your e-mail "
  >
    <template #body>
      <form @submit.prevent="forgotPasswordActions">
        <div class="form-group-auth">
          <label>Email</label>
          <input
            type="text"
            name="email"
            v-model="email"
            class="form-control"
          />
        </div>
        <g-button
          :isLoading="getLoading"
          type="submit"
          class="btn btn-lb btn-block mt-4 p-auth rounded-pill"
          >Send</g-button
        >
      </form>
    </template>
  </CardAuth>
</template>

<script>
import CardAuth from '@/components/molecules/CardAuth'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CardAuth
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    forgotPasswordActions() {
      this.forgotPassword({ email: this.email })
        .then((response) => {
          this.$toast.success(response.message)
          this.email = ''
          this.$router.push({ name: 'Login' })
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(err.data.message)
          this.email = ''
        })
    }
  },
  computed: {
    ...mapGetters(['getLoading'])
  }
}
</script>

<style scoped>
</style>
