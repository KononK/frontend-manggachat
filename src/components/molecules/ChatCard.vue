<template>
  <div
    class="neww"
    :class="[message.idUser === getDetailUser.id ? 'sender' : 'receiver']"
    v-if="message.type !== 6 && message.type !== 7"
  >
    <div class="set">
      <div class="contact-image">
        <b-avatar
          variant="info"
          :src="message.imageUser ? message.imageUser : ''"
          class="no-image-avatar"
        ></b-avatar>
      </div>
      <div class="message-text">
        <span
          v-if="message.idUser !== getDetailUser.id && getDetailRoom.type === 2"
          class="text-light mb-1 d-inline-block font-13"
          >{{ message.name }}</span
        >
        <div class="clearfix"></div>
        <p class="mb-0 text-danger font-weight-bold" v-if="message.deletedAt">
          (Deleted)
        </p>
        <p class="mb-0" v-if="!message.deletedAt">{{ message.message }}</p>
        <div v-if="message.location && !message.deletedAt" class="mt-1">
          <GmapMap
            :center="JSON.parse(message.location)"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 200px"
          ></GmapMap>
        </div>
        <div v-if="message.image && !message.deletedAt" class="mt-1">
          <button
            v-b-modal.modal-chat
            class="btn p-0"
            @click="$emit('detail-image', message.image)"
          >
            <b-img-lazy
              v-bind="mainProps"
              :src="message.image"
              alt="image user"
            ></b-img-lazy>
            <!-- <img :src="message.image" class="img-fluid rounded" /> -->
          </button>
        </div>
        <div v-if="message.documentName && !message.deletedAt" class="mt-1">
          <a
            class="d-block btn btn-sm btn-primary font-13 my-2"
            target="_blank"
            :href="message.documentUrl"
            >{{ message.documentName }}</a
          >
        </div>
        <timeago
          :datetime="message.createdAt"
          class="font-12"
          :auto-update="60"
        ></timeago>
        <small class="clock d-inline-block mt-1">{{
          filterTime(message.createdAt)
        }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['message'],
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: '#bbb',
        width: 600,
        height: 400,
        class: 'img-fluid rounded'
      }
    }
  },
  methods: {
    filterTime(val) {
      const date = new Date(val)
      const minute = date.getMinutes()
      const hours = date.getHours()
      const result = `${hours < 10 ? '0' + hours : hours}:${
        minute < 10 ? '0' + minute : minute
      }`
      return result
    }
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('room', ['getDetailRoom'])
  }
}
</script>

<style scoped>
.delete-message {
  position: absolute;
  right: -50px;
}
.set {
  display: flex;
  align-items: flex-end;
}
.sender .set {
  flex-direction: row-reverse;
}
.sender .set .contact-image {
  margin-left: 10px;
}
.receiver .set .contact-image {
  margin-right: 10px;
}

.sender .set .clock {
  float: right;
}
.receiver .set .clock {
  float: right;
}

.no-image {
  width: 45px;
  height: 45px;
  border-radius: 20px !important;
  margin-right: 10px;
}
.no-image-avatar {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
}
.main-chat {
  overflow: auto;
  margin-bottom: 70px;
}
.right-chat {
  display: flex;
  flex-direction: column;
}
.receiver {
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
}
.sender {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  align-items: flex-end;
}
.sender .message-text {
  border-radius: 25px 25px 0 25px;
  background-color: #eef;
  color: #444;
}
.receiver .message-text {
  border-radius: 25px 25px 25px 0;
  background-color: #7e98df;
  color: white;
}
.message-text {
  max-width: 250px;
  min-width: 250px;
  padding: 20px 15px;
  font-size: 14px;
}
.contact-image img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
@media screen and (max-width: 550px) {
  .contact-image {
    display: none !important;
  }
}
</style>
