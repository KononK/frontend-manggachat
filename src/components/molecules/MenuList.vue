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
    // ...mapActions('user', ['selectPrivateMessage']),
    // ...mapActions('room', [
    //   'myPrivateRoom',
    //   'myGroupRoom',
    //   'allMyRoom',
    //   'findRoom',
    //   'createPrivateRoom'
    // ]),
    // ...mapActions('friend', [
    //   'listFriend',
    //   'listUserNotFriend',
    //   'listPendingFriend',
    //   'listRequestFriend',
    //   'listRefuseFriend'
    // ]),
    handleNavigate(val) {
      if (val.name === 'Dashboard') {
        console.log('Dashboard')
      } else if (val.name === 'Private') {
        console.log('Private')
      } else if (val.name === 'Group') {
        console.log('Group')
      } else if (val.name === 'Friends') {
        console.log('Friends')
      } else if (val.name === 'Users') {
        console.log('Users')
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
