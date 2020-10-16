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
import { mapActions, mapGetters } from 'vuex'
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
    ...mapActions('room', ['myRoom']),
    ...mapActions('friend', ['myFriend']),
    ...mapActions(['changeFirstLoading']),
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
      await this.myRoom()
      await this.allUser()
      await this.myFriend()
    } catch (err) {
      console.log('err')
    }
    this.changeFirstLoading(false)
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('room', ['getDetailRoom']),
    ...mapGetters(['getFirstLoading']),
    getCurrentRoute() {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
</style>
