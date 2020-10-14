<template>
  <div class="contact-item" @click="$emit('select-room', room)">
    <div class="contact-image">
      <!-- <g-image v-if="user.image" url="contact/me.jpg" class="img-fluid" /> -->
      <b-avatar v-if="getPrivateImage" :src="getPrivateImage" class="no-image"></b-avatar>
      <b-avatar variant="info" v-if="!getPrivateImage" class="no-image"></b-avatar>
    </div>
    <div class="name-description">
      <h5 class="mb-0 font-17">{{getPrivateName}}</h5>
    </div>
    <div class="clock-check ml-auto">
      <button class="mb-0 font-14 btn btn-lb btn-sm" @click="handleAddFriend(room._id)">
        <b-icon icon="person-plus-fill" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    room: Object
  },
  methods: {
    ...mapActions('friend', ['addFriend']),
    handleAddFriend(id) {
      this.addFriend(id)
        .then((response) => {
          this.socket.emit('sendFriend', {
            sender: this.getDetailUser._id,
            nameSender: this.getDetailUser.name,
            receiver: id
          })
          this.$toast.success('Friend request sent')
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  computed: {
    ...mapState(['socket']),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('friend', ['getListFriend']),
    getPrivateName() {
      return this.room.name
    },
    getPrivateImage() {
      return this.room.image
    },
    checkFriend() {
      let asd
      this.getListFriend.map((friend) => {
        if (friend.receiver === this.room._id) {
          asd = 'Friend'
        } else {
          asd = 'Not Friend'
        }
      })
      return asd
    }
  }
}
</script>

<style scoped>
.contact-item {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
}

.contact-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  margin-right: 10px;
}

.no-image {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
  margin-right: 10px;
}

.name-description {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.name-description h5 {
  color: #232323;
}
.clock-check {
  display: flex;
  flex-direction: column;
}
.clock {
  color: #848484;
}
</style>
