<template>
  <div
    class="sidebar-title mt-4 mb-4 d-flex justify-content-between align-items-center"
  >
    <h5 class="mb-0 color-lb" v-if="!newTab">Mangga Chat</h5>
    <div class="bg-lb rounded-pill px-4" v-if="newTab">
      <router-link :to="{ name: 'Users' }" class="btn mr-2">
        <g-image url="icon/new_group.svg" />
      </router-link>
      <router-link :to="{ name: 'Private' }" class="btn mr-2">
        <g-image url="icon/lock.svg" />
      </router-link>
      <button class="btn" v-b-modal="'modal-room'">
        <g-image url="icon/new_channel.svg" />
      </button>
    </div>
    <div class="btn-group">
      <button
        type="button"
        class="btn p-0 no-focus"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <g-image url="icon/menu.svg" class="mr-2 cursor-pointer" />
      </button>
      <div class="dropdown-menu py-3 border-0 dropdown-menu-right">
        <button
          @click="$router.push({ name: 'Setting' })"
          class="dropdown-item d-flex justify-content-between"
          type="button"
        >
          <span>Setting</span>
          <g-image class="ml-5" url="icon/setting.svg" />
        </button>
        <router-link
          :to="{ name: 'Friends' }"
          class="dropdown-item d-flex justify-content-between"
          type="button"
        >
          <span>Friends</span>
          <g-image class="ml-5" url="icon/contact.svg" />
        </router-link>
        <router-link
          :to="{ name: 'Users' }"
          class="dropdown-item d-flex justify-content-between"
          type="button"
        >
          <span>Find Friends</span>
          <g-image class="ml-5" url="icon/invite.svg" />
        </router-link>
        <button
          @click="handleLogout"
          class="dropdown-item d-flex justify-content-between"
          type="button"
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
    <ModalRoom />
  </div>
</template>

<script>
import ModalRoom from '@/components/molecules/ModalRoom'
import { mapGetters } from 'vuex'
export default {
  props: ['newTab'],
  components: {
    ModalRoom
  },
  methods: {
    handleLogout() {
      this.logoutMixin(this.getDetailUser.id)
    }
  },
  computed: {
    ...mapGetters('user', ['getDetailUser'])
  }
}
</script>

<style scoped>
.dropdown-item:focus {
  outline: none;
  background-color: transparent;
}
.receiver {
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
}
.sender {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  align-items: flex-end;
}
.sender .message-text {
  border-radius: 35px 35px 10px 35px;
  background-color: #fff;
  color: #232323;
}
.receiver .message-text {
  border-radius: 35px 35px 35px 10px;
  background-color: #7e98df;
  color: white;
}
.message-text {
  max-width: 250px;
  padding: 20px;
  font-size: 14px;
}
.chat-input-card {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.contact-image img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  margin-right: 10px;
}
.no-message {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-message p {
  color: #848484;
  font-size: 20px;
}

.dropdown-menu.show {
  z-index: 2000;
}

.dropdown-menu {
  background: #7e98df !important;
  border-radius: 35px 10px 35px 35px !important;
}

.dropdown-item {
  color: white !important;
  margin-bottom: 10px;
}
.dropdown-item:hover {
  background: none;
  color: #fafafa !important;
}

/* width */
::-webkit-scrollbar {
  width: 1px;
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
