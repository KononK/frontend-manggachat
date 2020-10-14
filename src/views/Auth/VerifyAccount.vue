<template>
  <span></span>
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
        this.$toast.success(response.message)
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
