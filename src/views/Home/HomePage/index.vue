<template>
  <div>
    <div class="chat-list">
      <div v-if="getMyRoom.length > 0">
        <div v-for="room in getMyRoom" :key="room.id">
          <ContactItem
            @toggle-notification="handleToggleNotif"
            @detail-message="handleDetailMessage"
            :room="room"
          />
        </div>
      </div>
      <div v-else>
        <h5 class="text-danger text-center">Room Not Found!</h5>
      </div>
    </div>
  </div>
</template>

<script>
import ContactItem from '@/components/molecules/ContactItem'

import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    ContactItem
  },
  methods: {
    ...mapActions('message', ['detailMessage']),
    ...mapActions('room', ['changeNotif', 'memberRoom']),
    handleDetailMessage(id) {
      this.detailMessage({ id, page: 1 })
      this.memberRoom(id)
      this.$emit('change-type')
    },
    handleToggleNotif(id) {
      this.changeNotif(id)
    }
  },
  computed: {
    ...mapGetters('room', ['getMyRoom'])
  }
}
</script>

<style scoped>
</style>
