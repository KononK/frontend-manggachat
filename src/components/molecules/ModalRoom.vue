<template>
  <b-modal id="modal-room" hide-footer title="Create new group">
    <div class="form-group-auth">
      <label>Room Name</label>
      <input
        type="text"
        @keyup.enter="handleCreate"
        v-model="name"
        name="name"
        class="form-control"
      />
    </div>
    <div class="modal-footer border-0">
      <button
        type="button"
        class="btn btn-danger shadow-sm"
        @click="$bvModal.hide('modal-room')"
      >
        Close
      </button>
      <g-button
        :isLoading="getLoading"
        @cus-click="handleCreate"
        type="submit"
        class="btn btn-lb shadow-sm"
        >Create</g-button
      >
    </div>
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
    ...mapActions('room', ['createPublicRoom', 'allMyRoom']),
    handleCreate() {
      this.createPublicRoom(this.name)
        .then((response) => {
          this.$toast.success('Room berhasil di buat')
          this.$bvModal.hide('modal-room')
          this.allMyRoom().then((response) => {
            const onlyIdRoom = response.results.map((room) => room._id)
            const notifSetting = response.results.map((room) => {
              return {
                id: room._id,
                status: false
              }
            })
            localStorage.setItem('notif', JSON.stringify(notifSetting))
            this.socket.emit('tesjoin', onlyIdRoom)
          })
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters(['getLoading'])
  }
}
</script>

<style scoped>
</style>
