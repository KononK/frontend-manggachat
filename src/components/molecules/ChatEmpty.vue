<template>
  <div class="col-lg-8 col-md-7 bg-light no-message content-message max-vh-100 min-vh-100">
    <div class="text-center">
      <p class="mb-1 font-weight-bold">Hallo {{getDetailUser.name}}</p>
      <p>Please select a chat to start messaging</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters('user', ['getDetailUser'])
}
</script>

<style scoped>
.no-message {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-message p {
  color: #848484;
  font-size: 18px;
}
</style>
