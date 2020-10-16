<template>
  <div class="mt-4 overflow-auto">
    <b-tabs pills content-class="mt-3">
      <b-tab v-if="getDetailRoom.type === 1" title="Location" active>
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
      <b-tab title="Members" v-if="getDetailRoom.type === 2">
        <p>Members</p>
      </b-tab>
      <b-tab title="Images">
        <div class="d-flex flex-wrap-reverse justify-content-center">
          Detail Image
        </div>
      </b-tab>
      <b-tab title="Documents">
        <div class="d-flex flex-wrap-reverse">All Document</div>
      </b-tab>
      <b-tab title="Invite" v-if="getDetailRoom.type === 2"> Invite </b-tab>
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
    ...mapGetters('room', ['getDetailRoom'])
  }
}
</script>

<style scoped>
</style>
