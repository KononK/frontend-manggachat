<template>
  <div class="message-by mb-4 d-flex overflow-auto py-2 align-items-center">
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
    ...mapActions('user', ['selectPrivateMessage']),
    ...mapActions('room', [
      'myPrivateRoom',
      'myGroupRoom',
      'allMyRoom',
      'findRoom',
      'createPrivateRoom'
    ]),
    ...mapActions('friend', [
      'listFriend',
      'listUserNotFriend',
      'listPendingFriend',
      'listRequestFriend',
      'listRefuseFriend'
    ]),
    handleNavigate(val) {
      if (val.name === 'Dashboard') {
        this.allMyRoom()
      } else if (val.name === 'Private') {
        this.myPrivateRoom()
      } else if (val.name === 'Group') {
        this.myGroupRoom()
      } else if (val.name === 'Friends') {
        this.listPendingFriend()
        this.listRequestFriend()
        this.listRefuseFriend()
      } else if (val.name === 'Users') {
        this.listUserNotFriend()
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
/* width */
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #7e98df;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7e98df;
}
</style>
