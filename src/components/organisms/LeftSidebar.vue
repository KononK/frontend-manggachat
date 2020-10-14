<template>
  <div>
    <NavbarLeft :newTab="newTab" />
    <div class="sticky-top bg-white pt-2 pb-2">
      <SearchSidebar @show-tab="showNewTab" />
      <!-- <Stories /> -->
      <MenuList />
    </div>
    <div class="chat-list">
      <div
        v-if="currentRouteName !== 'Friends' && currentRouteName !== 'Users'"
      >
        <div class="text-center" v-if="isLoadingLocal">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div v-else>
          <div v-if="listFilter.length > 0">
            <ContactItem
              v-for="(room, i) in listFilter"
              @select-room="selectRoom"
              @change-notif="handleChangeNotif"
              :notif="listNotification[i]"
              :room="room"
              :key="room._id"
              :currentRoute="currentRouteName"
            />
          </div>
          <p
            v-if="listFilter.length === 0"
            class="text-center text-danger font-18 font-weight-bold"
          >
            Chat not found
          </p>
        </div>
      </div>
      <!-- FRIENDS ONLY -->
      <div v-if="currentRouteName === 'Friends'">
        <div class="border-bottom mb-3" v-if="pendingFriend.length > 0">
          <p>Pending</p>
          <ContactFriend
            :pending="true"
            v-for="room in pendingFriend"
            :room="room"
            :key="room._id"
          />
        </div>
        <div class="border-bottom mb-3" v-if="requestFriend.length > 0">
          <p>Friend Request</p>
          <ContactFriend
            :request="true"
            v-for="room in requestFriend"
            :room="room"
            :key="room._id"
          />
        </div>
        <div class="border-bottom mb-3" v-if="refuseFriend.length > 0">
          <p>Rejected</p>
          <ContactFriend
            :refuse="true"
            v-for="room in refuseFriend"
            :room="room"
            :key="room._id"
          />
        </div>
        <ContactFriend
          v-for="room in listFilter"
          @select-room="selectRoomFriends"
          :room="room"
          :key="room._id"
        />
      </div>
      <!-- FRIENDS ONLY END -->
      <!-- USERS ONLY -->
      <div v-if="currentRouteName === 'Users'">
        <ContactUser v-for="room in listFilter" :room="room" :key="room._id" />
      </div>
      <!-- /////USERS ONLY//// -->
    </div>
  </div>
</template>

<script>
import MenuList from '@/components/molecules/MenuList'
import SearchSidebar from '@/components/molecules/SearchSidebar'
import ContactItem from '@/components/molecules/ContactItem'
import ContactFriend from '@/components/molecules/ContactFriend'
import ContactUser from '@/components/molecules/ContactUser'
// import Stories from '@/components/molecules/Stories'
import NavbarLeft from '@/components/molecules/NavbarLeft'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: {
    SearchSidebar,
    ContactItem,
    NavbarLeft,
    MenuList,
    ContactFriend,
    ContactUser
    // Stories
  },
  data() {
    return {
      newTab: false,
      isLoadingLocal: false,
      listNotification: localStorage.getItem('notif')
        ? JSON.parse(localStorage.getItem('notif'))
        : []
    }
  },
  methods: {
    ...mapActions('user', ['selectPrivateMessage']),
    ...mapActions('room', [
      'saveMessageToDB',
      'detailRoom',
      'allMyRoom',
      'findRoom',
      'createPrivateRoom',
      'detailRoomImage',
      'detailRoomDocument'
    ]),
    ...mapActions('friend', [
      'listFriend',
      'listUserNotFriend',
      'listPendingFriend',
      'listRequestFriend'
    ]),
    handleChangeNotif(val) {
      console.log(val)
      const getNotif = localStorage.getItem('notif')
      const notifSetting = JSON.parse(getNotif)
      const p = notifSetting.filter((item) => item.id === val)
      p[0].status = p[0].status !== true
      localStorage.setItem('notif', JSON.stringify(notifSetting))
      this.listNotification = notifSetting
    },
    showNewTab() {
      this.newTab = !this.newTab
    },
    selectRoom(val) {
      this.detailRoom({ id: val._id }).then((response) => {
        this.selectPrivateMessage(response.results)
      })
      this.detailRoomImage(val._id)
      this.detailRoomDocument(val._id)
    },
    selectRoomFriends(val) {
      this.findRoom(val.idFriend._id)
        .then((response) => {
          this.selectPrivateMessage(response.results)
        })
        .catch((err) => {
          if (err.data.message === 'Room not found') {
            this.createPrivateRoom(val.idFriend._id)
              .then((response) => {
                this.socket.emit('createPrivate', {
                  sender: this.getDetailUser._id,
                  nameSender: this.getDetailUser.name,
                  receiver: val.idFriend._id
                })
                this.allMyRoom().then((response) => {
                  const onlyIdRoom = response.results.map((room) => room._id)
                  this.socket.emit('tesjoin', onlyIdRoom)
                })
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            console.log(err.data.message)
          }
        })
    }
  },
  mounted() {
    this.isLoadingLocal = true
    this.allMyRoom()
      .then((response) => {
        this.isLoadingLocal = false
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => {
        this.isLoadingLocal = false
      })
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters('user', ['getPrivateMessage', 'getDetailUser']),
    ...mapGetters('friend', [
      'getListFriend',
      'getListUserNotFriend',
      'getListRequestFriend',
      'getListPendingFriend',
      'getListRefuseFriend'
    ]),
    ...mapGetters('room', [
      'getAllMyRoom',
      'getAllPrivateRoom',
      'getAllGroupRoom'
    ]),
    currentRouteName() {
      return this.$route.name
    },
    listFilter() {
      if (this.currentRouteName === 'Dashboard') {
        return this.getAllMyRoom
      } else if (this.currentRouteName === 'Private') {
        return this.getAllPrivateRoom
      } else if (this.currentRouteName === 'Group') {
        return this.getAllGroupRoom
      } else if (this.currentRouteName === 'Friends') {
        return this.getListFriend
      } else if (this.currentRouteName === 'Users') {
        return this.getListUserNotFriend
      } else {
        return []
      }
    },
    pendingFriend() {
      return this.getListPendingFriend
    },
    requestFriend() {
      return this.getListRequestFriend
    },
    refuseFriend() {
      return this.getListRefuseFriend
    }
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #7e98df;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7e98df;
}
</style>
