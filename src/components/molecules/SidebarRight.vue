<template>
  <b-sidebar id="sidebar-right" right shadow>
    <h5 class="mb-0 color-lb font-18 text-center mb-3">
      {{ getPrivateUsername }}
    </h5>
    <div class="px-3 py-2">
      <div class="contact-image text-center">
        <b-avatar
          variant="info"
          v-if="getPrivateMessage.type === 2"
          :text="getPrivateImage"
          class="no-image-avatar"
        ></b-avatar>
        <b-avatar
          v-if="getPrivateMessage.type === 1 && !getPrivateImage"
          variant="info"
          class="no-image-avatar"
        ></b-avatar>
        <b-avatar
          v-if="getPrivateMessage.type === 1 && getPrivateImage"
          :src="getPrivateImage"
          class="no-image-avatar"
        ></b-avatar>
      </div>
      <div class="border-bottom pb-3 mt-4">
        <div>
          <p class="font-17 weight-500 mb-1">{{ getPrivateName }}</p>
          <p class="phone-number weight-400 mb-1 font-14">
            <span v-if="getPrivateMessage.type === 1">Online</span>
            <span v-if="getPrivateMessage.type === 2">Group</span>
          </p>
        </div>
        <div class="mt-4" v-if="getPrivateMessage.type === 1">
          <p class="font-17 weight-500 mb-1">Phone Number</p>
          <p class="phone-number weight-400 mb-1 font-14">
            {{ getPrivatePhone }}
          </p>
        </div>
      </div>
      <TabSidebarRight @detail-imaged="handleImaged" />
    </div>
    <ModalInvite />
  </b-sidebar>
</template>

<script>
import TabSidebarRight from '@/components/molecules/TabSidebarRight'
import ModalInvite from '@/components/molecules/ModalInvite'
import { mapGetters } from 'vuex'
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
    ModalInvite,
    TabSidebarRight
  },
  methods: {
    handleImaged(val) {
      this.$emit('detail-image', val)
    }
  },
  mounted() {
    this.$watchLocation({ enableHighAccuracy: true }).then((coordinates) => {
      this.location.lat = coordinates.lat
      this.location.lng = coordinates.lng
    })
  },
  computed: {
    ...mapGetters('user', ['getPrivateMessage', 'getDetailUser']),
    getPrivateUsername() {
      if (this.getPrivateMessage.type === 1) {
        const getName = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        if (getName[0].username) {
          return '@' + getName[0].username
        } else {
          return 'No username yet'
        }
      } else {
        return this.getPrivateMessage.roomName
      }
    },
    getPrivatePhone() {
      if (this.getPrivateMessage.type === 1) {
        const getName = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        if (getName[0].username) {
          return getName[0].phoneNumber
        } else {
          return 'No phone number yet'
        }
      } else {
        return this.getPrivateMessage.roomName
      }
    },
    getPrivateName() {
      if (this.getPrivateMessage.type === 1) {
        const getName = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getName[0].name
      } else {
        return this.getPrivateMessage.roomName
      }
    },
    getPrivateLocation() {
      if (this.getPrivateMessage.type === 1) {
        const getLocation = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getLocation[0].location
      } else {
        return true
      }
    },
    getPrivateImage() {
      if (this.getPrivateMessage.type === 1) {
        const getImage = this.getPrivateMessage.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        return getImage[0].image
      } else {
        const name = this.getPrivateMessage.roomName.split('')
        const first = name[0].toUpperCase()
        const last = name[name.length - 1].toUpperCase()
        return `${first}${last}`
      }
    }
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
