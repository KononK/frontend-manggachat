<template>
  <div>
    <div class="mt-4 mb-5 position-relative">
      <span @click="$router.push({name: 'Dashboard'})" class="cursor-pointer">
        <g-image class="back-icon" url="icon/back.svg" />
      </span>
      <h5
        class="mb-0 color-lb font-18 text-center"
      >{{getDetailUser.username ? `@${getDetailUser.username}` : 'No username yet'}}</h5>
    </div>
    <div class="mt-4 mb-5 text-center">
      <div class="contact-image">
        <b-avatar v-if="!getDetailUser.image" variant="info" class="no-image-avatar"></b-avatar>
        <b-avatar v-if="getDetailUser.image" :src="getDetailUser.image" class="no-image-avatar"></b-avatar>
      </div>
      <g-button
        v-b-modal.modal-profile
        class="btn btn-lb px-4 rounded shadow-sm font-12 btn-update-profile"
      >Update</g-button>
      <h5 class="mb-0 font-19 mt-1 color-23">{{getDetailUser.name}}</h5>
      <small
        class="text-muted"
      >{{getDetailUser.username ? `@${getDetailUser.username}` : 'No username yet'}}</small>
    </div>
    <div class="border-bottom">
      <p class="font-18 weight-500 mb-2">Account</p>
      <p
        class="phone-number weight-400 mb-1 font-15"
      >{{getDetailUser.phoneNumber ? getDetailUser.phoneNumber : 'No phone number yet'}}</p>
      <p
        class="font-15 color-lb cursor-pointer mb-0 pb-3"
        v-b-modal.modal-profile
      >Tap to change phone number</p>
    </div>
    <div class="border-bottom pt-3">
      <p
        class="font-15 weight-500 mb-1"
      >{{getDetailUser.username ? `@${getDetailUser.username}` : 'No username yet'}}</p>
      <p class="font-14 text-muted mb-0 pb-3">Username</p>
    </div>
    <div class="pt-3 border-bottom">
      <p
        class="font-15 weight-500 mb-1"
      >{{getDetailUser.bio ? getDetailUser.bio : 'The bio is not set yet'}}</p>
      <p class="font-14 text-muted mb-0 pb-3">Bio</p>
    </div>
    <div class="mt-3 border-bottom pb-4 mb-4">
      <p class="font-17 weight-500 mb-3">Location</p>
      <GmapMap
        :center="{lat:getDetailUser.location ? getDetailUser.location.lat : location.lat, lng:getDetailUser.location ? getDetailUser.location.lng : location.lng}"
        :zoom="18"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
      ></GmapMap>
    </div>
    <div class="mb-5 mt-3">
      <p class="font-18 weight-500 mb-3">Settings</p>
      <router-link to class="color-23 d-block mb-4 font-15 align-items-center d-flex">
        <g-image url="icon/union.svg" class="img-fluid mr-4" />
        <span>Notification and Sounds</span>
      </router-link>
      <router-link to class="color-23 d-block mb-4 font-15 align-items-center d-flex">
        <g-image url="icon/lock_2.svg" class="img-fluid mr-4" />
        <span>Privaty and Security</span>
      </router-link>
      <router-link to class="color-23 d-block mb-4 font-15 align-items-center d-flex">
        <g-image url="icon/usage.svg" class="img-fluid mr-4" />
        <span>Data and Stronge</span>
      </router-link>
      <router-link to class="color-23 d-block mb-4 font-15 align-items-center d-flex">
        <g-image url="icon/chat.svg" class="img-fluid mr-4" />
        <span>Chat Settings</span>
      </router-link>
      <router-link to class="color-23 d-block mb-4 font-15 align-items-center d-flex">
        <g-image url="icon/device.svg" class="img-fluid mr-4" />
        <span>Devices</span>
      </router-link>
    </div>
    <ModalProfile />
  </div>
</template>

<script>
import ModalProfile from '@/components/molecules/ModalProfile'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { ModalProfile },
  data() {
    return {
      newTab: false,
      location: {
        lat: 1,
        lng: 1
      }
    }
  },
  methods: {
    ...mapActions('user', ['clearPrivateMessage', 'detailUser']),
    showNewTab() {
      this.newTab = !this.newTab
    }
  },
  mounted() {
    this.detailUser()
    this.clearPrivateMessage()
    this.$watchLocation({ enableHighAccuracy: true }).then((coordinates) => {
      this.location.lat = coordinates.lat
      this.location.lng = coordinates.lng
    })
  },
  computed: {
    ...mapGetters('user', ['getDetailUser'])
  }
}
</script>

<style scoped>
p {
  color: #232323;
}
.contact-image img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
.btn-update-profile {
  position: relative;
  bottom: 15px;
}
.back-icon {
  position: absolute;
  top: 4px;
  left: 10px;
}
.no-image-avatar {
  width: 72px;
  height: 72px;
  border-radius: 20px !important;
}
</style>
