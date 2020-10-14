<template>
  <div class="sidebar-search mb-4">
    <div class="input-group mb-3">
      <g-image url="icon/search.svg" width="20" class="search-icon" />
      <input
        type="text"
        class="form-control font-15 rounded-pill border-0 bg-light"
        placeholder="Search chat"
        v-model="search"
        @keyup="searchHandle"
      />
      <div class="input-group-append">
        <button class="btn no-focus" type="button" @click="$emit('show-tab')">
          <g-image url="icon/plus.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions('room', ['searchMyRoom']),
    searchHandle() {
      this.searchMyRoom(this.search)
    }
  }
}
</script>

<style scoped>
.search-icon {
  position: absolute;
  z-index: 10;
  left: 15px;
  top: 10px;
}
.input-group > .form-control:focus {
  z-index: 0 !important;
}
.input-group input {
  padding-left: 45px;
}
</style>
