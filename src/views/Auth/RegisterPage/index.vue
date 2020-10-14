<template>
  <CardAuth title="Register" needBack description="Let’s create your account!">
    <template #body>
      <form @submit.prevent="registerAction">
        <div class="form-group-auth">
          <label>Name</label>
          <input type="text" v-model="name" name="name" class="form-control" />
        </div>
        <div class="form-group-auth">
          <label>Email</label>
          <input type="text" name="email" v-model="email" class="form-control" />
        </div>
        <div class="form-group-auth">
          <label>Password</label>
          <input type="password" name="password" v-model="password" class="form-control" />
        </div>
        <g-button
          type="submit"
          :isLoading="getLoading"
          class="btn-lb btn-block mt-4 p-auth rounded-pill"
        >Register</g-button>
        <div class="log-with my-4 border-bottom text-center position-relative">
          <span class="bg-white p-3 font-13">Register With</span>
        </div>
        <button
          type="button"
          class="btn btn-outline-lb btn-block p-auth rounded-pill d-flex align-items-center justify-content-center"
        >
          <g-image url="icon/google.svg" class="mr-2" />Google
        </button>
      </form>
    </template>
  </CardAuth>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardAuth from '@/components/molecules/CardAuth'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  components: {
    CardAuth
  },
  methods: {
    ...mapActions('auth', ['register']),
    registerAction() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.register(newUser)
        .then((response) => {
          this.$toast.success('Register successfully, please check you email!')
          this.name = ''
          this.email = ''
          this.password = ''
          this.$router.push({ name: 'Login' })
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
