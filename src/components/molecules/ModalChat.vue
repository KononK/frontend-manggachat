<template>
  <b-modal id="modal-chat" size="lg" hide-footer>
    <img :src="image" class="img-fluid" />
  </b-modal>
</template>

<script>
export default {
  props: ['image']
}
</script>

<style scoped>
</style>
