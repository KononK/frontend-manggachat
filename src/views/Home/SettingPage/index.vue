<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4 col-md-5 bg-white px-4 max-vh-100 overflow-auto">
        <LeftProfile />
      </div>
      <!-- Class when chat empty -->
      <ChatEmpty />
    </div>
  </div>
</template>

<script>
import LeftProfile from '@/components/organisms/LeftProfile'
import ChatEmpty from '@/components/molecules/ChatEmpty'
export default {
  components: {
    LeftProfile,
    ChatEmpty
  },
  data() {
    return {
      empty: true
    }
  }
}
</script>

<style scoped>
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

@media screen and (max-width: 767px) {
  .content-message {
    display: none;
  }
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
