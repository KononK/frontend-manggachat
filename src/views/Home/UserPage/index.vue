<template>
  <div>
    <div class="chat-list">
      <div v-if="getAllUser.length > 0">
        <div v-for="user in getAllUser" :key="user.id">
          <UserItem @add-friend="handleAddFriend" :user="user" />
        </div>
      </div>
      <div v-else>
        <h5 class="text-dark mb-5 text-center">There are no more users</h5>
        <g-image
          url="illustration/nofriends.svg"
          class="img-fluid px-1"
          alt="private"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from '@/components/molecules/UserItem'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: {
    UserItem
  },
  methods: {
    ...mapActions('friend', ['addFriend']),
    handleAddFriend(user) {
      user.isLoading = true
      this.addFriend(user.id)
        .then((response) => {
          this.socket.emit('addFriend', {
            sender: this.getDetailUser.id,
            nameSender: this.getDetailUser.name,
            receiver: user.id
          })
          this.$toast.success('Friend request sent successfully')
          user.isLoading = false
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
          user.isLoading = false
        })
    }
  },
  computed: {
    ...mapGetters('user', ['getAllUser', 'getDetailUser']),
    ...mapState(['socket'])
  }
}
</script>

<style scoped>
</style>
