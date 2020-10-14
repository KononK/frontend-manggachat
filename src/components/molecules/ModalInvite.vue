<template>
  <b-modal id="modal-invite" hide-footer title="Invite friend">
    <div class="text-center my-3" v-if="getListFriend.length < 1">
      <p>Kamu tidak mempunyai teman!</p>
      <button
        @click="$router.push({ name: 'Users' }), $bvModal.hide('modal-invite')"
        class="btn btn-primary btn-sm"
      >
        Cari Teman
      </button>
    </div>
    <b-list-group v-if="getListFriend.length > 0">
      <b-list-group-item v-for="friend in getListFriend" :key="friend._id">
        <div class="d-flex justify-content-between align-items-center">
          <span>{{ friend.idFriend.name }}</span>
          <div>
            <span
              class="cursor-pointer badge badge-primary"
              @click="handleInvite(friend)"
              >Invite</span
            >
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions('friend', ['listFriend']),
    ...mapActions('room', ['allMyRoom', 'inviteFriend']),
    handleInvite(val) {
      this.inviteFriend({
        id: this.getPrivateMessage._id,
        data: val.idFriend._id
      })
        .then((response) => {
          this.socket.emit('inviteFriend', {
            sender: this.getDetailUser._id,
            nameSender: this.getDetailUser.name,
            groupName: this.getPrivateMessage.roomName,
            receiver: val.idFriend._id
          })
          this.allMyRoom().then((response) => {
            const onlyIdRoom = response.results.map((room) => room._id)
            this.socket.emit('tesjoin', onlyIdRoom)
          })
          this.$toast.success(
            'Friends have been successfully added to the group'
          )
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  mounted() {
    this.listFriend()
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters(['getLoading']),
    ...mapGetters('friend', ['getListFriend']),
    ...mapGetters('user', ['getDetailUser', 'getPrivateMessage'])
  }
}
</script>

<style scoped>
</style>
