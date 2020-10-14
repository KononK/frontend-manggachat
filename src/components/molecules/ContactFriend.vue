<template>
  <div
    class="contact-item"
    :disabled="pending"
    @click="$emit('select-room', room)"
  >
    <div class="contact-image">
      <!-- <g-image v-if="user.image" url="contact/me.jpg" class="img-fluid" /> -->
      <b-avatar
        v-if="getPrivateImage"
        :src="getPrivateImage"
        class="no-image"
      ></b-avatar>
      <b-avatar
        variant="info"
        v-if="!getPrivateImage"
        class="no-image"
      ></b-avatar>
    </div>
    <div class="name-description">
      <h5 class="mb-0 font-17">{{ getPrivateName }}</h5>
    </div>
    <div class="clock-check text-right ml-auto">
      <p
        class="mb-0 font-14 clock"
        :class="[statusOnline === 'Online' ? 'text-success' : 'text-danger']"
        v-if="!pending && !request && !refuse"
      >
        {{ statusOnline }}
      </p>
      <p class="mb-0 font-14 clock" v-if="pending">Waiting</p>
      <p class="mb-0 font-14 clock text-danger" v-if="refuse">Rejected</p>
      <button
        @click="handleDelete(room.sender)"
        type="button"
        class="btn btn-danger btn-sm"
        v-if="refuse"
      >
        Delete
      </button>
      <div>
        <button
          class="mb-0 font-14 btn btn-lb btn-sm"
          v-if="request"
          @click="handleAcc(room.sender)"
        >
          <b-icon icon="check2" />
        </button>
        <button
          class="mb-0 font-14 ml-2 btn btn-danger btn-sm"
          v-if="request"
          @click="handleRefuse(room.sender)"
        >
          <b-icon icon="x" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    room: Object,
    pending: Boolean,
    request: Boolean,
    refuse: Boolean
  },
  methods: {
    ...mapActions('friend', [
      'accFriend',
      'listFriend',
      'listPendingFriend',
      'refuseFriend',
      'deleteFriend'
    ]),
    handleAcc(id) {
      this.accFriend(id)
        .then((response) => {
          this.socket.emit('accFriend', {
            sender: this.getDetailUser._id,
            nameSender: this.getDetailUser.name,
            receiver: id
          })
          this.$toast.success('Friendship accepted')
          this.listFriend()
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    },
    handleRefuse(id) {
      this.refuseFriend(id)
        .then((response) => {
          this.socket.emit('refuseFriend', {
            sender: this.getDetailUser._id,
            nameSender: this.getDetailUser.name,
            receiver: id
          })
          this.$toast.success('Friend request denied')
          this.listPendingFriend()
          this.listFriend()
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    },
    handleDelete(id) {
      this.deleteFriend(id)
        .then((response) => {
          this.socket.emit('handleDelete', {
            sender: this.getDetailUser._id,
            nameSender: this.getDetailUser.name,
            receiver: id
          })
          this.$toast.success('Friend deleted successfully')
          this.listPendingFriend()
          this.listFriend()
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapState(['socket']),
    getPrivateName() {
      return this.room.idFriend.name
    },
    getPrivateImage() {
      return this.room.idFriend.image
    },
    statusOnline() {
      return this.room.idFriend.statusOnline === true ? 'Online' : 'Offline'
    },
    getPrivateStatus() {
      if (this.room.type === 1) {
        const getName = this.room.members.filter(
          (item) => item._id !== this.getDetailUser._id
        )
        const status = getName[0].statusOnline
        return status ? 'warning' : 'danger'
      } else {
        return this.room.roomName
      }
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
