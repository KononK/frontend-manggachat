<template>
  <div class="col-lg-8 col-md-7 bg-light p-0 right-chat max-vh-100 min-vh-100">
    <ChatHeader @mobile-iconx="$emit('mobile-icon')" />
    <!-- {{ this.getDetailRoom.idRoom }} -->
    <!-- {{ page }} -->

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

      <div v-for="(message, i) in getDetailMessage" :key="i">
        <ChatCard :message="message" />
        <div
          v-if="message.type === 6"
          class="d-flex justify-content-center mb-2"
        >
          <p
            class="text-center text-white px-3 py-2 rounded bg-secondary font-12 mb-0 d-inline-block"
          >
            {{ message.name }} telah bergabung -
            <timeago
              :datetime="message.createdAt"
              class="font-12"
              :auto-update="60"
            ></timeago>
          </p>
        </div>
      </div>
    </div>
    <InputChat />
    <SidebarRight @detail-image="handleDetailImage" />
    <!-- <ModalChat :image="deailImage" /> -->
  </div>
</template>

<script>
// import ModalChat from '@/components/molecules/ModalChat'
import InputChat from '@/components/molecules/InputChat'
import ChatCard from '@/components/molecules/ChatCard'
import ChatHeader from '@/components/molecules/ChatHeader'
import SidebarRight from '@/components/molecules/SidebarRight'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: {
    SidebarRight,
    ChatHeader,
    ChatCard,
    InputChat
    // ModalChat
  },
  props: ['changeType'],
  data() {
    return {
      deailImage: '',
      messages: [],
      page: 1,
      infiniteId: +new Date()
    }
  },
  methods: {
    ...mapActions('message', ['detailMessageInfinite']),
    handleDetailImage(val) {
      this.deailImage = val
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
