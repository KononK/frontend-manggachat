<template>
  <div>
    <b-avatar v-if="custom" :src="customUrl" class="size-default"></b-avatar>
    <b-avatar variant="info" v-if="!custom" class="size-default"></b-avatar>
  </div>
</template>

<script>
export default {
  props: {
    custom: {
      type: Boolean,
      default: false
    },
    customUrl: String
  }
}
</script>

<style scoped>
.size-default {
  width: 50px;
  height: 50px;
  border-radius: 20px !important;
}
</style>
