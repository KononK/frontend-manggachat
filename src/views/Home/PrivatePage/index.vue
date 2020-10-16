<template>
  <div>
    <div class="chat-list">
      <div v-if="getPrivateRoom.length > 0">
        <div v-for="room in getPrivateRoom" :key="room.id">
          <ContactItem :room="room" />
        </div>
      </div>
      <div v-else>
        <h5 class="text-dark mb-5 text-center">There are no private rooms</h5>
        <g-image
          url="illustration/noprivate.svg"
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
    ...mapActions('room', ['privateRoom'])
  },
  mounted() {
    this.privateRoom()
  },
  computed: {
    ...mapGetters('room', ['getPrivateRoom'])
  }
}
</script>

<style scoped>
</style>
