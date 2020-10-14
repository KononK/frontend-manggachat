<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['interceptorsRequest', 'interceptorsResponse']),
    ...mapActions('room', [
      'allMyRoom',
      'detailRoom',
      'detailRoomImage',
      'detailRoomDocument'
    ]),
    ...mapActions('user', [
      'detailUser',
      'listUser',
      'updateLocation',
      'selectPrivateMessage'
    ]),
    ...mapActions('friend', [
      'listFriend',
      'listUserNotFriend',
      'listPendingFriend',
      'listRequestFriend',
      'listRefuseFriend'
    ])
  },
  mounted() {
    this.$getLocation().then((coordinates) => {
      this.updateLocation({
        location: { lat: coordinates.lat, lng: coordinates.lng }
      })
    })
    this.interceptorsRequest()
    this.interceptorsResponse()
    this.listUser()
    this.detailUser()
    this.allMyRoom().then((response) => {
      const onlyIdRoom = response.results.map((room) => room._id)
      this.socket.emit('tesjoin', onlyIdRoom)
      const notifSetting = response.results.map((room) => {
        return {
          id: room._id,
          status: false
        }
      })
      if (!localStorage.getItem('notif')) {
        localStorage.setItem('notif', JSON.stringify(notifSetting))
      }
    })
    this.listFriend()
    this.socket.on('notifSendFriend', (data) => {
      if (this.getDetailUser._id === data.receiver) {
        this.$toast.info(`${data.nameSender} want to be your friend`)
        this.listRequestFriend()
      }
    })
    this.socket.on('notifAccFriend', (data) => {
      if (this.getDetailUser._id === data.receiver) {
        this.$toast.info(`${data.nameSender} accepts your friendship`)
        this.listFriend()
        this.listPendingFriend()
      }
    })
    this.socket.on('notifRefuseFriend', (data) => {
      if (this.getDetailUser._id === data.receiver) {
        this.$toast.error(`Friend request rejected by ${data.nameSender} `)
        this.listFriend()
        this.listPendingFriend()
        this.listRefuseFriend()
      }
    })
    this.socket.on('notifDeleteFriend', (data) => {
      if (this.getDetailUser._id === data.receiver) {
        this.listFriend()
        this.listPendingFriend()
      }
    })
    this.socket.on('notifinviteFriend', (data) => {
      if (this.getDetailUser._id === data.receiver) {
        this.$toast.info(
          `${data.nameSender} telah menambahkan anda ke grup ${data.groupName}`
        )
        this.allMyRoom().then((response) => {
          const onlyIdRoom = response.results.map((room) => room._id)
          this.socket.emit('tesjoin', onlyIdRoom)
        })
      }
      if (this.getPrivateMessage._id === data.room) {
        this.selectPrivateMessage(data.myRoom)
      }
    })
    this.socket.on('notifCreatePrivate', (data) => {
      if (this.getDetailUser._id === data.receiver) {
        this.$toast.info(`${data.nameSender} memulai obrolan dengan anda`)
        this.allMyRoom().then((response) => {
          const onlyIdRoom = response.results.map((room) => room._id)
          this.socket.emit('tesjoin', onlyIdRoom)
        })
      }
    })
    this.socket.on('sendMessageHandle', (data) => {
      if (this.getPrivateMessage._id === data.room) {
        this.detailRoom({ id: data.room })
          .then((response) => {
            this.selectPrivateMessage(response.results)
          })
          .catch((err) => {
            console.log(err)
          })
        if (data.sendWhat === 3) {
          this.detailRoomImage(data.room)
        } else if (data.sendWhat === 4) {
          this.detailRoomDocument(data.room)
        }
      }
      this.allMyRoom()
      // this.$toast.info(`${data.roomName}: ${data.message}`)
    })
    this.socket.on('notifPesan', ({ notif, data }) => {
      const getNotif = localStorage.getItem('notif')
      const notifSetting = JSON.parse(getNotif)
      notifSetting.map((item) => {
        if (item.id === data.room && item.status === false) {
          this.$toast.info(notif)
        }
      })
      // logOrNo && this.$toast.info(notif)
    })
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState(['socket']),
    ...mapGetters('user', ['getDetailUser', 'getPrivateMessage'])
  }
}
</script>

<style scoped>
</style>
