<template>
  <div class="message-by mb-4 d-flex overflow-auto py-2 align-items-center">
    <div v-b-modal.modal-stories class="mr-2 story">
      <div class="border-stories">
        <b-avatar badge-variant="dark" size="50px">
          <template v-slot:badge><b-icon icon="plus"></b-icon></template>
        </b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <div class="mr-2 story">
      <div class="border-stories border-new">
        <b-avatar size="50px"></b-avatar>
      </div>
      <span class="font-10 mt-2">Cep Guna...</span>
    </div>
    <ModalStories />
  </div>
</template>

<script>
import ModalStories from '@/components/molecules/ModalStories'
export default {
  components: {
    ModalStories
  }
}
</script>

<style scoped>
.story {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.story:focus {
  outline: none;
}
.border-stories {
  padding: 2px;
  border-radius: 50%;
}
.border-new {
  border: 2px solid #7e98df;
}
.border-view {
  border: 2px solid #ddd;
}
</style>
