<template>
  <div class="card border-0 rounded-0">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <button type="button" @click="$emit('mobile-iconx')" class="btn">
          <g-image class="back-icon" url="icon/back.svg" />
        </button>
        <b-avatar
          v-if="getPrivateMessage.type === 1"
          :src="getPrivateImage"
          class="no-image mr-2"
        ></b-avatar>
        <b-avatar
          variant="info"
          v-if="getPrivateMessage.type === 2"
          :text="getPrivateImage"
          class="no-image mr-2"
        ></b-avatar>
        <div class="d-flex flex-column justify-content-around">
          <p class="mb-0 weight-500" v-b-toggle.sidebar-right>
            {{ getPrivateName }}
          </p>
          <!-- <p class="mb-0 font-11 text-muted" v-if="getPrivateMessage.type === 2">Guna, Ridwan, Angga, Ica,....</p> -->
          <p class="mb-0 font-12" v-if="message">{{ typingMessage }}...</p>
          <span class="color-lb font-12" v-if="!message">{{
            statusOnline
          }}</span>
        </div>
      </div>
      <button class="btn">
        <g-image url="icon/profile_menu.svg" class="img-fluid" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      typingMessage: '',
      message: ''
    }
  },

  mounted() {
    this.socket.on('typingNotif', (data) => {
      if (data.room === this.getPrivateMessage._id) {
        this.typingMessage = data.notif
        this.message = data.message
      }
    })
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters('user', ['getPrivateMessage', 'getDetailUser']),
    getPrivateName() {
      if (this.getPrivateMessage.type === 1) {
        const getName = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getName[0].name
      } else {
        return this.getPrivateMessage.roomName
      }
    },
    getPrivateImage() {
      if (this.getPrivateMessage.type === 1) {
        const getImage = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getImage[0].image
      } else {
        const name = this.getPrivateMessage.roomName.split('')
        const first = name[0].toUpperCase()
        const last = name[name.length - 1].toUpperCase()
        return `${first}${last}`
      }
    },
    statusOnline() {
      if (this.getPrivateMessage.type === 1) {
        const getStatus = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getStatus[0].statusOnline ? 'Online' : 'Offline'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.back-icon {
  display: none;
}
@media screen and (max-width: 766px) {
  .back-icon {
    display: block;
  }
}

.no-image {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
}
</style>
