<template>
  <div class="mt-4 overflow-auto">
    <b-tabs pills content-class="mt-3">
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
        <p>Ini member</p>
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
      <b-tab title="Invite" v-if="getDetailRoom.type === 2">
        <template v-slot:title>
          <b-icon icon="person-plus-fill" />
        </template>
        Invite
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    handleInvite(val) {
      console.log('ok')
    }
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('friend', ['getMyFriend']),
    ...mapGetters('room', ['getDetailRoom']),
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
    }
  }
}
</script>

<style scoped>
</style>
