<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-md-5 bg-white px-4 max-vh-100 overflow-auto">
        <div
          v-if="getCurrentRoute !== 'Setting'"
          :class="[getDetailRoom.idRoom ? 'mobile' : '']"
        >
          <NavbarLeft :newTab="newTab" />
          <div class="sticky-top bg-white pt-2 pb-2">
            <SearchSidebar @show-tab="showNewTab" />
            <!-- <Stories /> -->
            <MenuList />
          </div>
        </div>
        <div v-if="getFirstLoading" class="my-4">
          <div class="mb-4">
            <b-skeleton animation="wave" width="95%"></b-skeleton>
            <b-skeleton animation="wave" width="75%"></b-skeleton>
            <b-skeleton animation="wave" width="80%"></b-skeleton>
          </div>
          <div class="mb-4">
            <b-skeleton animation="wave" width="95%"></b-skeleton>
            <b-skeleton animation="wave" width="75%"></b-skeleton>
            <b-skeleton animation="wave" width="80%"></b-skeleton>
          </div>
          <div class="mb-4">
            <b-skeleton animation="wave" width="95%"></b-skeleton>
            <b-skeleton animation="wave" width="75%"></b-skeleton>
            <b-skeleton animation="wave" width="80%"></b-skeleton>
          </div>
          <div class="mb-4">
            <b-skeleton animation="wave" width="95%"></b-skeleton>
            <b-skeleton animation="wave" width="75%"></b-skeleton>
            <b-skeleton animation="wave" width="80%"></b-skeleton>
          </div>
          <div class="mb-4">
            <b-skeleton animation="wave" width="95%"></b-skeleton>
            <b-skeleton animation="wave" width="75%"></b-skeleton>
            <b-skeleton animation="wave" width="80%"></b-skeleton>
          </div>
        </div>
        <div
          class="mt-4 mb-5"
          v-if="!getFirstLoading"
          :class="[getDetailRoom.idRoom ? 'mobile' : '']"
        >
          <router-view @change-type="handleChangeType" />
        </div>

        <!-- <LeftSidebar :class="[getPrivateMessage.roomName ? 'mobile' : '']" /> -->
      </div>
      <!-- Class when chat empty -->
      <ChatEmpty v-if="!getDetailRoom.idRoom" />
      <ChatSection
        :changeType="{
          infiniteId,
          page,
          messages
        }"
        v-if="getDetailRoom.idRoom"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
import MenuList from '@/components/molecules/MenuList'
import ChatSection from '@/components/organisms/ChatSection'
import SearchSidebar from '@/components/molecules/SearchSidebar'
// import Stories from '@/components/molecules/Stories'
import NavbarLeft from '@/components/molecules/NavbarLeft'
import { mapActions, mapGetters, mapState } from 'vuex'
import ChatEmpty from '@/components/molecules/ChatEmpty'
export default {
  components: {
    ChatEmpty,
    SearchSidebar,
    NavbarLeft,
    MenuList,
    ChatSection
    // Stories
  },
  data() {
    return {
      location: {
        lat: 1,
        lng: 1
      },
      newTab: false,
      page: 1,
      messages: [],
      infiniteId: +new Date()
    }
  },
  methods: {
    ...mapActions('auth', ['interceptorsRequest', 'interceptorsResponse']),
    ...mapActions('user', ['detailUser', 'updateLocation', 'allUser']),
    ...mapActions('room', ['myRoom', 'detailRoom']),
    ...mapActions('friend', ['myFriend']),
    ...mapActions(['changeFirstLoading']),
    ...mapActions('message', ['detailMessage']),
    showNewTab() {
      this.newTab = !this.newTab
    },
    handleChangeType() {
      this.page = 1
      this.messages = []
      this.infiniteId += 1
    }
  },
  async mounted() {
    this.interceptorsRequest()
    this.interceptorsResponse()
    this.changeFirstLoading(true)
    try {
      await this.detailUser()
      if (this.getCurrentRoute !== 'Setting') {
        this.$getLocation()
          .then(async (coordinates) => {
            await this.updateLocation({
              id: this.getDetailUser.id,
              location: JSON.stringify({
                lat: coordinates.lat,
                lng: coordinates.lng
              })
            })
          })
          // eslint-disable-next-line handle-callback-err
          .catch(async (err) => {
            if (!this.getDetailUser.location) {
              await this.updateLocation({
                id: this.getDetailUser.id,
                location: JSON.stringify({ lat: 1, lng: 1 })
              })
            }
          })
      }
      const responseMyRoom = await this.myRoom()
      const roomsId = responseMyRoom.data.map((item) => item.idRoom)
      this.socket.emit('join-room', roomsId)
      await this.allUser()
      await this.myFriend()
    } catch (err) {
      console.log('err')
    }
    this.changeFirstLoading(false)
    this.socket.on('notifAddFriend', (data) => {
      if (this.getDetailUser.id === data.receiver) {
        this.$toast.info(`${data.nameSender} want to be your friend`)
        this.myFriend()
        this.allUser()
      }
    })
    this.socket.on('notifAccFriend', (data) => {
      if (this.getDetailUser.id === data.receiver) {
        this.$toast.info(`${data.nameSender} accepts your friendship`)
        this.myFriend()
        this.myRoom()
      }
    })
    this.socket.on('notifRejectFriend', (data) => {
      if (this.getDetailUser.id === data.receiver) {
        this.$toast.error(`Friend request rejected by ${data.nameSender} `)
        this.myFriend()
      }
    })
    this.socket.on('notifDeleteFriend', (data) => {
      if (this.getDetailUser.id === data.receiver) {
        console.log('Yahah')
        this.myFriend()
        this.allUser()
      }
    })
    this.socket.on('sendMessageHandle', (data) => {
      // console.log(data.room)
      // console.log(this.getDetailRoom.idRoom)
      if (this.getDetailRoom.idRoom === data.room) {
        this.detailMessage({ id: data.room, page: 1 })
      }
      this.myRoom()
    })
    this.socket.on('notifDeleteMessage', (data) => {
      this.myRoom()
    })
    this.socket.on('notifPesan', ({ notif, data }) => {
      this.getMyRoom.map((item) => {
        if (item.idRoom === data.room && item.notification === 1) {
          this.$toast.info(notif)
        }
      })
      // logOrNo && this.$toast.info(notif)
    })
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapState(['socket']),
    ...mapGetters('room', ['getDetailRoom', 'getMyRoom']),
    ...mapGetters(['getFirstLoading']),
    getCurrentRoute() {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
</style>
