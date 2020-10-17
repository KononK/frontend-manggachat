<template>
  <div class="col-lg-8 col-md-7 bg-light p-0 right-chat max-vh-100 min-vh-100">
    <ChatHeader @mobile-iconx="handleClickIcon" />

    <div
      class="main-chat px-4 py-3 max-vh-100"
      v-chat-scroll="{
        always: false,
        smooth: true,
        scrollonremoved: true,
        smoothonremoved: false
      }"
    >
      <infinite-loading
        spinner="circles"
        :identifier="infiniteId"
        direction="top"
        @infinite="infiniteHandler"
      ></infinite-loading>
      <swipe-list
        ref="list"
        :disabled="!enabled"
        :items="getDetailMessage"
        item-key="id"
      >
        <template v-slot="{ item }">
          <div class="card-content">
            <ChatCard @detail-image="handleDetailImage" :message="item" />
            <div
              v-if="item.type === 6"
              class="d-flex justify-content-center mb-2"
            >
              <p
                class="text-center text-white px-3 py-2 rounded bg-secondary font-12 mb-0 d-inline-block"
              >
                {{ item.name }} telah membuat group {{ getDetailRoom.name }}-
                <timeago
                  :datetime="item.createdAt"
                  class="font-12"
                  :auto-update="60"
                ></timeago>
              </p>
            </div>
            <div
              v-if="item.type === 7"
              class="d-flex justify-content-center mb-2"
            >
              <p
                class="text-center text-white px-3 py-2 rounded bg-secondary font-12 mb-0 d-inline-block"
              >
                {{ item.name }} Join group-
                <timeago
                  :datetime="item.createdAt"
                  class="font-12"
                  :auto-update="60"
                ></timeago>
              </p>
            </div>
          </div>
        </template>
        <template v-slot:right="{ item }">
          <div v-if="item.idUser === getDetailUser.id && !item.deletedAt">
            <button class="btn btn-info ml-3 mr-2" @click="closeAll">
              <b-icon icon="x" />
            </button>
            <button
              class="btn btn-danger"
              @click="handleDeleteMessage(item.id)"
            >
              <b-icon icon="trash" />
            </button>
          </div>
        </template>
        <template v-slot:empty>
          <div>list is empty ( filtered or just empty )</div>
        </template>
      </swipe-list>
    </div>
    <InputChat />
    <SidebarRight @detail-image="handleDetailImage" />
    <ModalChat :image="deailImage" />
  </div>
</template>

<script>
import ModalChat from '@/components/molecules/ModalChat'
import InputChat from '@/components/molecules/InputChat'
import ChatCard from '@/components/molecules/ChatCard'
import ChatHeader from '@/components/molecules/ChatHeader'
import SidebarRight from '@/components/molecules/SidebarRight'
import { mapActions, mapGetters, mapState } from 'vuex'
import { SwipeList } from 'vue-swipe-actions'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'
export default {
  components: {
    SidebarRight,
    ChatHeader,
    ChatCard,
    InputChat,
    SwipeList,
    ModalChat
  },
  props: ['changeType'],
  data() {
    return {
      deailImage: '',
      messages: [],
      page: 1,
      infiniteId: +new Date(),
      enabled: true
    }
  },
  methods: {
    closeAll() {
      this.$refs.list.closeActions()
    },
    ...mapActions('message', ['detailMessageInfinite', 'deleteMessage']),
    ...mapActions('room', ['clearDetailRoom']),
    handleDetailImage(val) {
      this.deailImage = val
    },
    handleClickIcon() {
      this.clearDetailRoom()
    },
    handleDeleteMessage(id) {
      this.confirmDelete('Message', () => {
        this.deleteMessage(id)
        this.socket.emit('sendMessage', {
          sendWhat: 10,
          room: this.getDetailRoom.idRoom,
          type: this.getDetailRoom.type,
          roomName: this.getDetailRoom.name,
          name: this.getDetailUser.name,
          email: this.getDetailUser.email,
          senderId: this.getDetailUser.id,
          message: 'Delete message'
        })
      })
    },
    infiniteHandler($state) {
      this.detailMessageInfinite({
        id: this.getDetailRoom.idRoom,
        page: this.page
      }).then((response) => {
        if (response.data.length) {
          this.page += 1
          if (this.page !== 2) {
            this.getDetailMessage.unshift(...response.data.reverse())
          }
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  },
  watch: {
    // eslint-disable-next-line space-before-function-paren
    changeType: function (newVal, oldVal) {
      this.page = newVal.page
      this.messages = newVal.messages
      this.infiniteId = newVal.infiniteId
    }
  },
  computed: {
    ...mapState(['socket']),
    ...mapState('message', ['detailMessage']),
    ...mapGetters('message', ['getDetailMessage']),
    ...mapGetters('room', ['getDetailRoom']),
    ...mapGetters('user', ['getDetailUser'])
  }
}
</script>

<style scoped>
.main-chat {
  overflow: auto;
  margin-bottom: 70px;
}
.right-chat {
  display: flex;
  flex-direction: column;
}
.icon-sticker {
  right: 70px;
  bottom: 28px;
  width: 20px;
}
.icon-plus {
  right: 100px;
  bottom: 29px;
  width: 17px;
}
.icon-send {
  right: 40px;
  bottom: 29px;
  width: 17px;
}
.input-chat {
  border: 0;
  background: #ddd;
  border-radius: 15px;

  padding-right: 120px !important;
}
.chat-input-card {
  position: absolute;
  width: 100%;
  bottom: 0;
}
/* width */
::-webkit-scrollbar {
  width: 1px;
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
