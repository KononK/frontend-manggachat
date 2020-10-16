<template>
  <CardAuth title="Reset Password" description="Please reset your password!">
    <template #body>
      <form @submit.prevent="resetAction">
        <div class="form-group-auth">
          <label>New Password</label>
          <input type="password" v-model="newPassword" class="form-control" />
        </div>
        <div class="form-group-auth">
          <label>Confirm New Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="form-control"
          />
        </div>
        <g-button
          type="submit"
          :isLoading="getLoading"
          class="btn btn-lb btn-block mt-3 p-auth rounded-pill"
          >Reset Password</g-button
        >
      </form>
    </template>
  </CardAuth>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardAuth from '@/components/molecules/CardAuth'
export default {
  components: {
    CardAuth
  },
  data() {
    return {
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions('auth', ['verifyResetPassword', 'resetPassword']),
    resetAction() {
      if (!this.newPassword) {
        this.$toast.error('New password required')
      } else if (!this.confirmPassword) {
        this.$toast.error('Confirm new password required')
      } else if (this.newPassword.length < 6) {
        this.$toast.error('New password min 6 character')
      } else if (this.newPassword !== this.confirmPassword) {
        this.$toast.error(
          'New password with password confirmation is not the same'
        )
      } else {
        const token = this.$route.query.token
        this.resetPassword({
          token,
          password: this.newPassword,
          confirmPassword: this.confirmPassword
        })
          .then((response) => {
            this.$toast.success(response.message)
            this.$router.push({ name: 'Login' })
          })
          .catch((err) => {
            this.$toast.error(err.data.message)
            this.newPassword = ''
            this.confirmPassword = ''
          })
      }
    }
  },
  mounted() {
    const token = this.$route.query.token
    this.verifyResetPassword({ token })
      .then((response) => {
        this.$toast.success('Token OK')
      })
      .catch((err) => {
        this.$toast.error(err.data.message)
        this.$router.push({ name: 'Login' })
      })
  },
  computed: {
    ...mapGetters(['getLoading'])
  }
}
</script>

<style scoped>
</style>
