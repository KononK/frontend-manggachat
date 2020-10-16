<template>
  <b-modal id="modal-room" hide-footer title="Create new group">
    <div class="form-group-auth">
      <label>Group Name</label>
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
    ...mapActions('room', ['addPublicRooms']),
    handleCreate() {
      if (!this.name) {
        this.$toast.error('Name required')
      } else {
        this.addPublicRooms(this.name)
          .then((response) => {
            console.log(response)
            this.$toast.success('Group created successfully')
            this.name = ''
            this.$bvModal.hide('modal-room')
          })
          .catch((err) => {
            this.$toast.error(err.data.message)
          })
      }
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
