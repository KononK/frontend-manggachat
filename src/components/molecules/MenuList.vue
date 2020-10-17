<template>
  <div class="message-by d-flex overflow-auto py-2 align-items-center">
    <div v-for="(menu, i) in menus" :key="i">
      <router-link
        :to="{ name: menu.name }"
        @click.native="handleNavigate(menu)"
        :class="[currentRouteName === menu.name ? 'btn-lb' : '']"
        class="d-inline-block btn rounded-pill mr-2"
        >{{ menu.name }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { mapActions } from 'vuex'
export default {
  data() {
    return {
      menus: [
        {
          name: 'Dashboard',
          status: false
        },
        {
          name: 'Private',
          status: false
        },
        {
          name: 'Group',
          status: false
        },
        {
          name: 'Friends',
          status: false
        },
        {
          name: 'Users',
          status: false
        }
      ]
    }
  },
  methods: {
    ...mapActions('room', ['myRoom']),
    ...mapActions('friend', ['myFriend']),
    ...mapActions('user', ['allUser']),
    handleNavigate(val) {
      if (val.name === 'Dashboard') {
        this.myRoom()
      } else if (val.name === 'Private') {
        this.myRoom()
      } else if (val.name === 'Group') {
        this.myRoom()
      } else if (val.name === 'Friends') {
        this.myFriend()
      } else if (val.name === 'Users') {
        this.allUser()
      }
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
</style>
