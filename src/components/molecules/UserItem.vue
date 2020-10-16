<template>
  <div>
    <div class="contact-item">
      <div class="d-flex">
        <div class="contact-image">
          <b-avatar
            class="no-image"
            :src="user.image ? user.image : ''"
          ></b-avatar>
        </div>
        <div class="name-description">
          <h5 class="mb-0 font-17">{{ user.name }}</h5>
        </div>
      </div>
      <div class="text-right">
        <g-button
          :isLoading="user.isLoading"
          @cus-click="$emit('add-friend', user)"
          class="btn btn-sm btn-info"
        >
          <b-icon icon="person-plus-fill" />
        </g-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    user: Object
  },
  data() {
    return {
      status: true
    }
  },
  methods: {},
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters(['getLoading']),
    getCurrentRoute() {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.contact-item {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
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
