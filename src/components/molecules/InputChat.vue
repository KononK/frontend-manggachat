<template>
  <div>
    <div class="position-absolute emoji-card">
      <VEmojiPicker v-if="showEmoji" @select="selectEmoji" />
    </div>
    <div class="card border-0 rounded-0 chat-input-card">
      <div class="card-body position-relative">
        <input
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
        <div v-else>
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
    handleShowEmoji() {
      this.showEmoji = !this.showEmoji
    },
    selectEmoji(emoji) {
      this.message += emoji.data
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
