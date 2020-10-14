import {
  mapActions
} from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['logoutUser']),
    ...mapActions('user', ['updateStatusOnline']),
    logoutMixin(idUser) {
      this.confirmSwal('Logout', 'Are you sure you want to log out ?', 'warning', () => {
        this.updateStatusOnline({
          idUser: idUser,
          status: false
        })
        this.logoutUser()
        this.$router.push({
          name: 'Login'
        })
        this.$toast.success('Logout success')
      })
    }
  }
}
