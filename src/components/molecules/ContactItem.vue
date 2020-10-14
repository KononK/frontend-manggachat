<template>
  <div>
    <div class="contact-item">
      <div class="contact-image">
        <!-- <g-image v-if="user.image" url="contact/me.jpg" class="img-fluid" /> -->
        <b-avatar
          v-if="room.type === 1"
          badge
          :badge-variant="getPrivateStatus"
          badge-offset="2px"
          :src="getPrivateImage"
          class="no-image"
        ></b-avatar>
        <b-avatar
          variant="info"
          v-if="room.type === 2"
          :text="getPrivateImage"
          class="no-image"
        ></b-avatar>
      </div>
      <div
        class="name-description cursor-pointer"
        @click="$emit('select-room', room)"
      >
        <h5 class="mb-0 font-17">
          {{ getPrivateName }}
        </h5>
        <p v-if="room.messages.length > 0" class="mb-0 font-13 color-lb">
          {{
            room.messages[room.messages.length - 1].idUser.name
              ? room.messages[room.messages.length - 1].idUser._id ===
                getDetailUser._id
                ? 'Me'
                : room.messages[room.messages.length - 1].idUser.name
              : 'Unknow'
          }}:
          {{
            room.messages[room.messages.length - 1].message.length > 30
              ? room.messages[room.messages.length - 1].message.substr(0, 30) +
                '...'
              : room.messages[room.messages.length - 1].message
          }}
        </p>
        <p v-else class="mb-0 font-13 color-lb">Click to send message</p>
      </div>
      <div class="clock-check text-right ml-auto">
        <p v-if="room.messages.length > 0" class="mb-0 font-14 clock">
          {{ filterTime(room.messages[room.messages.length - 1].time) }}
        </p>
        <!-- <div>
        <p
          class="badge mb-0 btn-lb rounded-circle"
          v-if="room.messages.length > 0"
        >
          {{ room.messages.length }}
        </p>
      </div> -->
        <span
          v-if="currentRoute === 'Dashboard'"
          class="cursor-pointer"
          @click="$emit('change-notif', room._id)"
          ><b-icon :icon="notif.status ? 'volume-mute' : 'volume-up'"
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    room: Object,
    notif: Object,
    currentRoute: String
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
    checkNotifAvailable() {
      return !!localStorage.getItem('notif')
    },
    getPrivateName() {
      if (this.room.type === 1) {
        const getName = this.room.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getName[0].name
      } else {
        return this.room.roomName
      }
    },
    getPrivateStatus() {
      if (this.room.type === 1) {
        const getName = this.room.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        const status = getName[0].statusOnline
        return status ? 'warning' : 'danger'
      } else {
        return this.room.roomName
      }
    },
    getPrivateImage() {
      if (this.room.type === 1) {
        const getImage = this.room.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getImage[0].image
      } else {
        const name = this.room.roomName.split('')
        const first = name[0].toUpperCase()
        const last = name[name.length - 1].toUpperCase()
        return `${first}${last}`
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
