<template>
  <div>
    <div class="position-absolute emoji-card">
      <VEmojiPicker v-if="showEmoji" @select="selectEmoji" />
    </div>
    <div class="card border-0 rounded-0 chat-input-card">
      <div class="card-body position-relative">
        <div class="font-12 badge badge-primary mb-2" v-if="fileImage">
          1 Image selected: {{ fileImage ? fileImage.name : '' }}
          <span class="ml-2 cursor-pointer" @click="removeImage">X</span>
        </div>
        <div class="font-12 badge badge-primary mb-2" v-if="fileDoc">
          1 Document selected: {{ fileDoc ? fileDoc.name : '' }}
          <span class="ml-2 cursor-pointer" @click="removeDoc">X</span>
        </div>
        <input
          @keyup.enter="send"
          v-model="message"
          type="text"
          placeholder="Type your message..."
          class="form-control input-chat font-14"
        />
        <div class="btn-group position-absolute icon-plus">
          <button
            type="button"
            class="btn p-0 no-focus"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <g-image url="icon/plus.svg" class="cursor-pointer icc-plus" />
          </button>
          <div class="dropdown-menu py-3 border-0 dropdown-menu-right">
            <button
              class="dropdown-item mb-2 d-flex justify-content-between"
              type="button"
            >
              <b-form-file
                size="sm"
                class="w-100"
                v-model="fileImage"
                :state="Boolean(fileImage)"
                placeholder="Select image"
                accept="image/*"
              ></b-form-file>
              <g-image class="ml-5" url="icon/image.png" width="18" />
            </button>
            <button
              class="dropdown-item mb-2 d-flex justify-content-between"
              type="button"
            >
              <b-form-file
                size="sm"
                class="w-100"
                v-model="fileDoc"
                :state="Boolean(fileDoc)"
                placeholder="Select document"
                accept=".pdf, .txt, .docx, .excel"
              ></b-form-file>
              <g-image class="ml-5" url="icon/documents.png" width="18" />
            </button>
            <button
              class="dropdown-item mb-2 d-flex justify-content-between"
              type="button"
            >
              <span>Contacts</span>
              <g-image class="ml-5" url="icon/contacts.png" width="18" />
            </button>
            <button
              @click="handleShareLoc"
              class="dropdown-item mb-2 d-flex justify-content-between"
              type="button"
            >
              <span>Location</span>
              <g-image class="ml-5" url="icon/location.png" width="14" />
            </button>
          </div>
        </div>
        <div @click="handleShowEmoji">
          <g-image
            url="icon/sticker.svg"
            class="icon-sticker position-absolute cursor-pointer"
          />
        </div>
        <div v-if="isLoadingLocal">
          <b-spinner
            class="icon-send position-absolute"
            variant="primary"
            style="width: 1rem"
            small
            label="Loading..."
          ></b-spinner>
        </div>
        <div v-else @click="send">
          <g-image
            url="icon/send.svg"
            class="icon-send position-absolute cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      message: '',
      showEmoji: false,
      fileImage: null,
      fileDoc: null,
      isLoadingLocal: false
    }
  },
  components: {
    VEmojiPicker
  },
  methods: {
    ...mapActions('room', ['detailRoom']),
    ...mapActions('message', ['sendMessage']),
    handleShowEmoji() {
      this.showEmoji = !this.showEmoji
    },
    selectEmoji(emoji) {
      this.message += emoji.data
    },
    removeImage() {
      this.fileImage = null
    },
    removeDoc() {
      this.fileDoc = null
    },
    send() {
      if (this.fileImage) {
        this.handleSendMessageImg()
      } else if (this.fileDoc) {
        this.handleSendMessageDoc()
      } else {
        this.handleSendMessage()
      }
    },
    handleSendMessage() {
      if (this.message === '') {
        this.$toast.error('Input tidak boleh kosong')
      } else {
        const dataMessage = {
          idUser: this.getDetailUser.id,
          idRoom: this.getDetailRoom.idRoom,
          message: this.message,
          typeMessage: 'message'
        }
        this.isLoadingLocal = true
        this.sendMessage(dataMessage)
          .then((response) => {
            this.socketForMessage(1)
            this.clearState()
          })
          .catch((err) => {
            this.clearState()
            console.log(err)
          })
      }
    },
    handleSendMessageImg() {
      const formData = new FormData()
      if (this.fileImage) {
        if (this.fileImage.size > 4194304) {
          return this.$toast.error('Max file size 4MB')
        }
      }
      formData.append('file', this.fileImage)
      formData.append('idUser', this.getDetailUser.id)
      formData.append('idRoom', this.getDetailRoom.idRoom)
      formData.append('message', this.message)
      formData.append('typeMessage', 'image')
      this.isLoadingLocal = true
      this.sendMessage(formData)
        .then((response) => {
          this.socketForMessage(3)
          this.clearState()
        })
        .catch((err) => {
          this.clearState()
          console.log(err)
        })
    },
    handleSendMessageDoc() {
      const formData = new FormData()
      if (this.fileDoc) {
        if (this.fileDoc.size > 4194304) {
          return this.$toast.error('Max file size 4MB')
        }
      }
      formData.append('file', this.fileDoc)
      formData.append('idUser', this.getDetailUser.id)
      formData.append('idRoom', this.getDetailRoom.idRoom)
      formData.append('message', this.message)
      formData.append('typeMessage', 'doc')
      this.isLoadingLocal = true
      this.sendMessage(formData)
        .then((response) => {
          this.socketForMessage(4)
          this.clearState()
        })
        .catch((err) => {
          this.clearState()
          console.log(err)
        })
    },
    handleShareLoc() {
      this.confirmSwal(
        'Location',
        'Share current location ?',
        'question',
        () => {
          const dataMessage = {
            idUser: this.getDetailUser.id,
            idRoom: this.getDetailRoom.idRoom,
            message: 'Share Location',
            location: this.getDetailUser.location,
            typeMessage: 'location'
          }
          this.isLoadingLocal = true
          this.sendMessage(dataMessage)
            .then((response) => {
              this.socketForMessage(2)
              this.clearState()
            })
            .catch((err) => {
              this.clearState()
              console.log(err)
            })
        }
      )
    },
    socketForMessage(type) {
      const data = {
        sendWhat: type,
        room: this.getDetailRoom.idRoom,
        type: this.getDetailRoom.type,
        roomName: this.getDetailRoom.name,
        name: this.getDetailUser.name,
        email: this.getDetailUser.email,
        senderId: this.getDetailUser.id,
        message: this.message
      }
      if (type === 3) {
        data.message = this.message ? this.message : 'Send image'
      } else if (type === 4) {
        data.message = this.message ? this.message : 'Send Document'
      } else if (type === 2) {
        data.message = 'Share Location'
        data.location = this.getDetailUser.location
      }
      this.socket.emit('sendMessage', data)
    },
    clearState() {
      this.message = ''
      this.showEmoji = false
      this.fileImage = null
      this.fileDoc = null
      this.isLoadingLocal = false
    }
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('room', ['getDetailRoom']),
    checkDisabled() {
      return !!this.fileImage
    }
  }
}
</script>
<style scoped>
.emoji-card {
  bottom: 80px;
  right: 10px;
}
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
  bottom: 25px;
}
.icc-plus {
  width: 17px;
}
.icon-send {
  right: 40px;
  bottom: 29px;
  width: 20px;
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

.dropdown-menu-right {
  min-width: 300px;
}

.dropdown-menu.show {
  z-index: 2000;
}

.dropdown-menu {
  background: #7e98df !important;
  border-radius: 35px 35px 15px 35px !important;
}

.dropdown-item {
  color: white !important;
  margin-bottom: 10px;
}
.dropdown-item:hover {
  background: none;
  color: #fafafa !important;
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
