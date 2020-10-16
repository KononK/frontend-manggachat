<template>
  <b-sidebar id="sidebar-right" right shadow>
    <h5 class="mb-0 color-lb font-18 text-center mb-3">
      {{ getDetailRoom.name }}
    </h5>
    <div class="px-3 py-2">
      <div class="contact-image text-center">
        <b-avatar
          v-if="getDetailRoom.type === 2"
          :text="`${getDetailRoom.name[0]}${
            getDetailRoom.name[getDetailRoom.name.length - 1]
          }`"
          class="no-image-avatar"
        ></b-avatar>
      </div>
      <div class="border-bottom pb-3 mt-4">
        <div>
          <p class="font-17 weight-500 mb-1">{{ getDetailRoom.name }}</p>
          <p class="phone-number weight-400 mb-1 font-14">
            <span v-if="getDetailRoom.type === 2">Group</span>
            <span v-if="getDetailRoom.type === 1">Online</span>
          </p>
        </div>
        <div class="mt-4" v-if="getDetailRoom.type === 1">
          <p class="font-17 weight-500 mb-1">Phone Number</p>
          <p class="phone-number weight-400 mb-1 font-14">Phone</p>
        </div>
      </div>
      <TabSidebarRight />
    </div>
    <!-- <ModalInvite /> -->
  </b-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
import TabSidebarRight from '@/components/molecules/TabSidebarRight'
// import ModalInvite from '@/components/molecules/ModalInvite'
export default {
  data() {
    return {
      location: {
        lat: 1,
        lng: 1
      },
      deailImage: ''
    }
  },
  components: {
    // ModalInvite,
    TabSidebarRight
  },
  computed: {
    ...mapGetters('room', ['getDetailRoom'])
  }
}
</script>

<style scoped>
.contact-image img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
.no-image-avatar {
  width: 72px;
  height: 72px;
  border-radius: 20px !important;
}
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
