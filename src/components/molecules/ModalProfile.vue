<template>
  <b-modal id="modal-profile" hide-footer title="Update Profile">
    <form @submit.prevent="handleUpdate">
      <div class="form-group-auth">
        <label>Name</label>
        <input type="text" v-model="name" name="name" class="form-control" />
      </div>
      <div class="form-group-auth">
        <label>Username</label>
        <input
          type="text"
          v-model="username"
          name="username"
          class="form-control"
        />
      </div>
      <div class="form-group-auth">
        <label>Phone Number</label>
        <input
          type="text"
          v-model="phoneNumber"
          name="phoneNumber"
          class="form-control"
        />
      </div>
      <div class="form-group-auth">
        <label>Bio</label>
        <input type="text" v-model="bio" name="bio" class="form-control" />
      </div>
      <div class="form-group-auth">
        <label>Image</label>
        <b-form-file
          v-model="fileImage"
          :state="Boolean(fileImage)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          class="mt-1"
          accept=".jpg, .png, .jpeg"
        ></b-form-file>
      </div>
      <div class="form-group-auth" v-if="getDetailUser.image">
        <label>Old Image</label>
        <b-avatar
          :src="getDetailUser.image"
          size="7rem"
          class="d-block rounded-0 mt-2"
        ></b-avatar>
        <!-- <img :src="getDetailUser.image" class="img-fluid d-block" width="200" alt /> -->
      </div>
      <div class="modal-footer border-0">
        <button
          type="button"
          class="btn btn-danger shadow-sm"
          @click="$bvModal.hide('modal-profile')"
        >
          Close
        </button>
        <g-button
          :isLoading="getLoading"
          type="submit"
          class="btn btn-lb shadow-sm"
          >Update</g-button
        >
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: '',
      username: '',
      phoneNumber: '',
      bio: '',
      fileImage: null
    }
  },
  methods: {
    ...mapActions('user', ['updateUser']),
    handleUpdate() {
      const formData = new FormData()
      if (this.fileImage) {
        if (this.fileImage.size > 2097152) {
          return this.$toast.error('Max file size 2MB')
        }
      }
      formData.append('image', this.fileImage)

      formData.append('name', this.name)
      formData.append('username', this.username)
      formData.append('phoneNumber', this.phoneNumber)
      formData.append('bio', this.bio)
      this.updateUser({ id: this.getDetailUser._id, data: formData })
        .then((response) => {
          this.$toast.success(response.message)
          this.$bvModal.hide('modal-profile')
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  created() {
    this.name = this.getDetailUser.name
    this.username = this.getDetailUser.username
    this.phoneNumber = this.getDetailUser.phoneNumber
    this.bio = this.getDetailUser.bio
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters(['getLoading'])
  }
}
</script>

<style scoped>
</style>
