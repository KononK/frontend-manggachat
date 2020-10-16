<template>
  <div class="card border-0 rounded-0">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <button type="button" @click="$emit('mobile-iconx')" class="btn">
          <g-image class="back-icon" url="icon/back.svg" />
        </button>
        <b-avatar
          v-if="getDetailRoom.type === 2"
          :text="`${getDetailRoom.name[0]}${
            getDetailRoom.name[getDetailRoom.name.length - 1]
          }`"
          class="no-image mr-2"
        ></b-avatar>
        <div class="d-flex flex-column justify-content-around">
          <p class="mb-0 weight-500" v-b-toggle.sidebar-right>
            {{ getDetailRoom.name }}
          </p>
          <!-- <p class="mb-0 font-11 text-muted" v-if="getPrivateMessage.type === 2">Guna, Ridwan, Angga, Ica,....</p> -->
          <p class="mb-0 font-12" v-if="message">Sedang Mengetik...</p>
          <span class="color-lb font-12" v-if="!message">
            {{ getDetailRoom.type === 2 ? 'Group' : 'Private' }}
          </span>
        </div>
      </div>
      <button class="btn">
        <g-image url="icon/profile_menu.svg" class="img-fluid" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      typingMessage: '',
      message: ''
    }
  },
  computed: {
    ...mapGetters('room', ['getDetailRoom'])
  }
}
</script>

<style scoped>
.back-icon {
  display: none;
}
@media screen and (max-width: 766px) {
  .back-icon {
    display: block;
  }
}

.no-image {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
}
</style>
