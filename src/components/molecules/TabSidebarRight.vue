<template>
  <div class="mt-4 overflow-auto">
    <b-tabs pills content-class="mt-4">
      <b-tab v-if="getDetailRoom.type === 1" title="Location" active>
        <template v-slot:title>
          <b-icon icon="geo-alt-fill" />
        </template>
        <GmapMap
          :center="JSON.parse(getPrivate.location)"
          :zoom="18"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        ></GmapMap>
      </b-tab>
      <b-tab title="Members" v-if="getDetailRoom.type === 2">
        <template v-slot:title>
          <b-icon icon="people-fill" />
        </template>
        <p>Total Member {{ getMemberRoom.length }}</p>
        <div
          class="d-flex justify-content-between align-items-center mb-3"
          v-for="(member, i) in getMemberRoom"
          :key="i"
        >
          <div class="d-flex align-items-center">
            <b-avatar class="no-image-avatar" :src="member.image"></b-avatar>
            <div class="ml-2">
              <p class="font-15 mb-0">{{ member.name }}</p>
              <span class="font-12 text-muted">{{
                member.status === 1 ? 'Admin' : 'Member'
              }}</span>
            </div>
          </div>
          <p
            class="font-14"
            :class="[member.statusOnline ? 'text-success' : 'text-danger']"
          >
            {{ member.statusOnline ? 'online' : 'offline' }}
          </p>
        </div>
      </b-tab>
      <b-tab title="Images">
        <template v-slot:title>
          <b-icon icon="card-image" />
        </template>
        <h5
          v-if="getImageRoom.length === 0"
          class="my-4 text-danger text-center"
        >
          No Images
        </h5>
        <div
          v-if="getImageRoom.length > 0"
          class="d-flex flex-wrap-reverse justify-content-center"
        >
          <div v-for="allImage in getImageRoom" :key="allImage._id">
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
        <template v-slot:title>
          <b-icon icon="file-earmark-fill" />
        </template>
        <h5
          v-if="getDocumentRoom.length === 0"
          class="my-4 text-danger text-center"
        >
          No Document
        </h5>
        <div v-if="getDocumentRoom.length > 0" class="d-flex flex-wrap-reverse">
          <div
            v-for="allDoc in getDocumentRoom"
            class="w-100"
            :key="allDoc._id"
          >
            <a
              class="d-block btn btn-sm btn-dark btn-block mb-2 font-13"
              target="_blank"
              :href="allDoc.documentUrl"
              >{{ allDoc.documentName }}</a
            >
          </div>
        </div>
      </b-tab>
      <b-tab
        title="Invite"
        v-if="
          (getDetailRoom.type === 2 && getAdmin.status === 1) ||
          (getDetailRoom.type === 2 && getDetailRoom.memberCanInvite === 1)
        "
      >
        <template v-slot:title>
          <b-icon icon="person-plus-fill" />
        </template>
        <p>
          Invite Friends
          <b-spinner
            v-if="getLoading"
            class="ml-1"
            type="border"
            small
          ></b-spinner>
        </p>
        <h5
          v-if="filterFriendInRoom.length === 0"
          class="my-4 text-danger text-center"
        >
          Friends are already in the room or you don't have friends yet
        </h5>
        <div
          class="d-flex justify-content-between align-items-center mb-3"
          v-for="(friend, i) in filterFriendInRoom"
          :key="i"
        >
          <div class="d-flex align-items-center">
            <b-avatar class="no-image-avatar" :src="friend.image"></b-avatar>
            <div class="ml-2">
              <p class="font-15 mb-0">{{ friend.friendName }}</p>
            </div>
          </div>
          <button
            @click="handleInvite(friend.idFriend)"
            class="btn btn-lb btn-sm"
          >
            <b-icon icon="plus" />
          </button>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions('room', ['inviteUser']),
    handleInvite(val) {
      const data = {
        idUser: val,
        idRoom: this.getDetailRoom.idRoom
      }
      this.inviteUser(data)
        .then((response) => {
          this.$toast.success(
            'The user has been successfully added to the room'
          )
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('friend', ['getMyFriend']),
    ...mapGetters('room', ['getDetailRoom', 'getMemberRoom']),
    ...mapGetters('message', ['getDetailMessage']),
    getImageRoom() {
      return this.getDetailMessage.filter((item) => item.type === 3)
    },
    getDocumentRoom() {
      return this.getDetailMessage.filter((item) => item.type === 4)
    },
    getPrivate() {
      if (this.getDetailRoom.type === 1) {
        if (this.getDetailRoom.idSender === this.getDetailUser.id) {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.getDetailRoom.idReceiver
          )[0]
        } else {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.getDetailRoom.idSender
          )[0]
        }
      } else {
        return 'NAH'
      }
    },
    getAdmin() {
      const admin = this.getMemberRoom.filter(
        (member) => member.idUser === this.getDetailUser.id
      )
      return admin.length !== 0 ? admin[0] : {}
    },
    filterFriendInRoom() {
      if (this.getDetailRoom.type === 2) {
        const listMember = this.getMemberRoom.map((member) => member.idUser)
        // eslint-disable-next-line space-before-function-paren
        const filtered = this.getMyFriend.filter(function (e) {
          return this.indexOf(e.idFriend) < 0
        }, listMember)
        return filtered
      } else {
        return 'NAH'
      }
      // return tampung
    }
  }
}
</script>

<style scoped>
</style>
