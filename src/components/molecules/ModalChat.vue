<template>
  <b-modal id="modal-chat" size="lg" hide-footer>
    <b-img-lazy
      thumbnail
      fluid
      v-bind="mainProps"
      :src="image"
      alt="Image user"
    ></b-img-lazy>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: '#bbb',
        width: 600,
        height: 400,
        class: 'my-5'
      }
    }
  },
  props: ['image']
}
</script>

<style scoped>
</style>
