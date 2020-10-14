<template>
  <div class="mt-4 overflow-auto">
    <b-tabs pills content-class="mt-3">
      <b-tab v-if="getPrivateMessage.type === 1" title="Location" active>
        <GmapMap
          :center="{
            lat: getPrivateLocation ? getPrivateLocation.lat : location.lat,
            lng: getPrivateLocation ? getPrivateLocation.lng : location.lng
          }"
          :zoom="18"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        ></GmapMap>
      </b-tab>
      <b-tab title="Members" v-if="getPrivateMessage.type === 2">
        <div
          class="d-flex justify-content-between"
          v-for="(member, i) in getPrivateMessage.members"
          :key="i"
        >
          <p>{{ member.name }}</p>
          <p
            class="font-14"
            :class="[member.statusOnline ? 'text-success' : 'text-danger']"
          >
            {{ member.statusOnline ? 'online' : 'offline' }}
          </p>
        </div>
      </b-tab>
      <b-tab title="Images">
        <div class="d-flex flex-wrap-reverse justify-content-center">
          <div v-for="allImage in getAllImageRoom" :key="allImage._id">
            <div
              v-b-modal.modal-chat
              @click="$emit('detail-imaged', allImage.image)"
            >
              <b-avatar
                class="m-2"
                rounded
                :src="allImage.image"
                size="120px"
              ></b-avatar>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Documents">
        <div class="d-flex flex-wrap-reverse">
          <div v-for="allDoc in getAllDocRoom" class="w-100" :key="allDoc._id">
            <a
              class="d-block btn btn-sm btn-dark btn-block mb-2 font-13"
              target="_blank"
              :href="allDoc.document"
              >Download {{ allDoc.documentName }}</a
            >
          </div>
        </div>
      </b-tab>
      <b-tab title="Invite" v-if="getPrivateMessage.type === 2">
        <div class="text-center my-3" v-if="getListFriend.length < 1">
          <p>Kamu tidak mempunyai teman!</p>
          <button
            @click="
              $router.push({ name: 'Users' }), $bvModal.hide('modal-invite')
            "
            class="btn btn-primary btn-sm"
          >
            Cari Teman
          </button>
        </div>
        <div v-if="getListFriend.length > 0">
          <div
            class="d-flex justify-content-between"
            v-for="friend in getListFriend"
            :key="friend._id"
          >
            <p>{{ friend.idFriend.name }}</p>
            <div>
              <span
                class="cursor-pointer badge badge-primary"
                @click="handleInvite(friend)"
                >Invite</span
              >
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  methods: {
    ...mapActions('friend', ['listFriend']),
    ...mapActions('room', ['allMyRoom', 'inviteFriend']),
    handleInvite(val) {
      this.inviteFriend({
        id: this.getPrivateMessage._id,
        data: val.idFriend._id
      })
        .then((response) => {
          this.socket.emit('inviteFriend', {
            sender: this.getDetailUser._id,
            nameSender: this.getDetailUser.name,
            groupName: this.getPrivateMessage.roomName,
            room: this.getPrivateMessage._id,
            receiver: val.idFriend._id
          })
          this.allMyRoom().then((response) => {
            const onlyIdRoom = response.results.map((room) => room._id)
            this.socket.emit('tesjoin', onlyIdRoom)
          })
          this.$toast.success(
            'Friends have been successfully added to the group'
          )
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  mounted() {
    this.listFriend()
  },
  computed: {
    ...mapGetters('user', ['getPrivateMessage', 'getDetailUser']),
    ...mapGetters('room', ['getAllImageRoom', 'getAllDocRoom']),
    ...mapState(['socket']),
    ...mapGetters(['getLoading']),
    ...mapGetters('friend', ['getListFriend']),
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
</style>
