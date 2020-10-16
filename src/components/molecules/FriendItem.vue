<template>
  <div>
    <div class="contact-item">
      <div class="d-flex">
        <div class="contact-image">
          <!-- <g-image v-if="user.image" url="contact/me.jpg" class="img-fluid" /> -->
          <b-avatar
            class="no-image"
            :src="friend.image ? friend.image : ''"
          ></b-avatar>
        </div>
        <div
          class="name-description"
          :class="friend.status === 1 ? 'cursor-pointer' : ''"
        >
          <h5 class="mb-0 font-17">{{ friend.friendName }}</h5>
          <p class="mb-0 font-13 text-muted">
            {{ getStatusName }}
          </p>
        </div>
      </div>
      <div
        v-if="
          friend.idUser === getDetailUser.id &&
          friend.idSender === getDetailUser.id &&
          friend.status === 2
        "
      >
        <button
          @click="$emit('delete-decline-friend', friend.idFriend)"
          class="btn btn-sm btn-danger my-1"
        >
          <b-icon icon="x" />
        </button>
      </div>
      <div
        v-if="
          friend.idUser === getDetailUser.id &&
          friend.idSender !== getDetailUser.id &&
          friend.status === 0
        "
      >
        <button
          @click="$emit('acc-friend', friend.idFriend)"
          class="btn btn-sm btn-success mr-1 my-1"
        >
          <b-icon icon="check" />
        </button>
        <button
          @click="$emit('reject-friend', friend.idFriend)"
          class="btn btn-sm btn-danger my-1"
        >
          <b-icon icon="x" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    friend: Object
  },
  data() {
    return {
      status: true
    }
  },
  methods: {},
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    getCurrentRoute() {
      return this.$route.name
    },
    getStatusName() {
      if (
        this.friend.status === 0 &&
        this.friend.idSender === this.getDetailUser.id
      ) {
        return 'Request has been sent'
      } else if (
        this.friend.status === 0 &&
        this.friend.idSender !== this.getDetailUser.id
      ) {
        return 'Send a friend request'
      } else if (
        this.friend.status === 2 &&
        this.friend.idSender === this.getDetailUser.id
      ) {
        return 'Friend request denied'
      } else {
        return this.friend.statusOnline ? 'Online' : 'Offline'
      }
    }
  }
}
</script>

<style scoped>
.contact-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
