<template>
  <div>
    <div class="chat-list">
      <div v-if="getGroupRoom.length > 0">
        <div v-for="room in getGroupRoom" :key="room.id">
          <ContactItem @detail-message="handleDetailMessage" :room="room" />
        </div>
      </div>
      <div v-else>
        <h5 class="text-dark mb-5 text-center">There are no group</h5>
        <g-image
          url="illustration/nogroup.svg"
          class="img-fluid px-1"
          alt="private"
        />
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
    ...mapActions('room', ['groupRoom']),
    ...mapActions('message', ['detailMessage']),

    handleDetailMessage(id) {
      this.detailMessage({ id, page: 1 })
      this.$emit('change-type')
    }
  },
  mounted() {
    this.groupRoom()
  },
  computed: {
    ...mapGetters('room', ['getGroupRoom'])
  }
}
</script>

<style scoped>
</style>
