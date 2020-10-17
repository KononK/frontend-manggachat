<template>
  <div class="card border-0 rounded-0">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <button type="button" @click="$emit('mobile-iconx')" class="btn">
          <g-image class="back-icon" url="icon/back.svg" />
        </button>
        <b-avatar
          v-if="getDetailRoom.type === 2"
          :text="`${getDetailRoom.name[0]}${
            getDetailRoom.name[getDetailRoom.name.length - 1]
          }`"
          class="no-image mr-2"
        ></b-avatar>
        <b-avatar
          v-if="getDetailRoom.type === 1"
          :src="getPrivate.image"
          class="no-image mr-2"
        ></b-avatar>
        <div class="d-flex flex-column justify-content-around">
          <p class="mb-0 weight-500" v-if="getDetailRoom.type === 2">
            {{ getDetailRoom.name }}
          </p>
          <p class="mb-0 weight-500" v-if="getDetailRoom.type === 1">
            {{ getPrivate.friendName }}
          </p>
          <!-- <p class="mb-0 font-11 text-muted" v-if="getPrivateMessage.type === 2">Guna, Ridwan, Angga, Ica,....</p> -->
          <p class="mb-0 font-12" v-if="message">{{ typingMessage }}...</p>
          <span class="color-lb font-12" v-if="!message">
            {{
              getDetailRoom.type === 2
                ? 'Group'
                : getPrivate.statusOnline === 1
                ? 'Online'
                : 'Offline'
            }}
          </span>
        </div>
      </div>
      <button class="btn" v-b-toggle.sidebar-right>
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
      console.log(data)
      if (data.room === this.getDetailRoom.idRoom) {
        this.typingMessage = data.notif
        this.message = data.message
      }
    })
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters('room', ['getDetailRoom']),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('friend', ['getMyFriend']),
    getPrivate() {
      if (this.getDetailRoom.type === 1) {
        if (this.getDetailRoom.idSender === this.getDetailUser.id) {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.getDetailRoom.idReceiver
          )[0]
        } else {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.getDetailRoom.idSender
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
.no-image {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
}
</style>
