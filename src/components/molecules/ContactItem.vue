<template>
  <div>
    <div class="contact-item">
      <div class="contact-image">
        <b-avatar
          v-if="room.type === 2"
          :text="`${room.name[0]}${room.name[room.name.length - 1]}`"
          class="no-image"
        ></b-avatar>
        <b-avatar
          :src="getPrivate.image"
          v-if="room.type === 1"
          class="no-image"
        ></b-avatar>
      </div>
      <div
        @click="$emit('detail-message', room.idRoom)"
        class="name-description cursor-pointer"
      >
        <h5 class="mb-0 font-17" v-if="room.type === 2">{{ room.name }}</h5>
        <h5 class="mb-0 font-17" v-if="room.type === 1">
          {{ getPrivate.friendName }}
        </h5>
        <p class="mb-0 font-13 text-muted">
          {{
            room.sender === getDetailUser.id && room.type === 2 ? 'Me: ' : ''
          }}
          {{ filterMessage }}
        </p>
      </div>
      <div class="clock-check text-right ml-auto">
        <p class="mb-0 font-14 clock">
          {{ filterTime(room.createdAt) }}
        </p>
        <span
          v-if="getCurrentRoute === 'Dashboard'"
          class="cursor-pointer text-muted"
          @click="$emit('toggle-notification', room.idRoom)"
          ><b-icon :icon="room.notification ? 'bell-fill' : 'bell'"
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    room: Object
  },
  data() {
    return {}
  },
  methods: {
    filterTime(val) {
      const date = new Date(val)
      const minute = date.getMinutes()
      const hours = date.getHours()
      const result = `${hours < 10 ? '0' + hours : hours}:${
        minute < 10 ? '0' + minute : minute
      }`
      return result
    }
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('room', ['getMyRoom']),
    ...mapGetters('friend', ['getMyFriend']),
    getCurrentRoute() {
      return this.$route.name
    },
    filterMessage() {
      if (this.room.deletedAt) {
        return '(Deleted)'
      } else {
        return this.room.message.length > 40
          ? this.room.message.substr(0, 40) + '...'
          : this.room.message
      }
    },
    getPrivate() {
      if (this.room.type === 1) {
        if (this.room.idSender === this.getDetailUser.id) {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.room.idReceiver
          )[0]
        } else {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.room.idSender
          )[0]
        }
      } else {
        return 'NAH'
      }
    }
  }
}
</script>

<style scoped>
.contact-item {
  display: flex;
  margin-bottom: 20px;
}

.contact-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  margin-right: 10px;
}

.no-image {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
  margin-right: 10px;
}

.name-description {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.name-description h5 {
  color: #232323;
}
.clock-check {
  display: flex;
  flex-direction: column;
}
.clock {
  color: #848484;
}
</style>
