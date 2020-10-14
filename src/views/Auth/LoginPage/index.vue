<template>
  <CardAuth title="Login" description="Hi, Welcome back!">
    <template #body>
      <!-- <img src="../../../assets/images/logo.svg" width="50" /> -->
      <form @submit.prevent="loginAction">
        <div class="form-group-auth">
          <label>Email</label>
          <input
            type="text"
            v-model="email"
            name="email"
            class="form-control"
          />
        </div>
        <div class="form-group-auth">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            name="password"
            class="form-control"
          />
        </div>
        <router-link
          :to="{ name: 'ForgotPassword' }"
          class="float-right font-14 my-2 text-decoration-none"
          >Forgot Password ?</router-link
        >
        <div class="clearfix"></div>
        <g-button
          type="submit"
          :isLoading="getLoading"
          class="btn btn-lb btn-block mt-3 p-auth rounded-pill"
          >Login</g-button
        >
        <div class="log-with my-4 border-bottom text-center position-relative">
          <span class="bg-white p-3 font-13">Login With</span>
        </div>
        <button
          type="button"
          class="btn btn-outline-lb btn-block p-auth rounded-pill d-flex align-items-center justify-content-center"
        >
          <g-image url="icon/google.svg" class="mr-2" />Google
        </button>
        <p class="text-center mt-4 mb-0 font-14">
          Don’t have an account?
          <router-link :to="{ name: 'Register' }">Sign Up</router-link>
        </p>
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
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('user', ['updateLocation', 'updateStatusOnline']),
    loginAction() {
      const dataUser = {
        email: this.email,
        password: this.password
      }
      this.login(dataUser)
        .then((response) => {
          this.updateStatusOnline({
            idUser: response.results.idUser,
            status: true
          })
          this.$toast.success('Login success')
          const r = Math.random().toString(36).substring(7)
          this.$router.push({
            name: 'Home',
            params: { id: r, email: this.email }
          })
          this.email = ''
          this.password = ''
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
          this.password = ''
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
