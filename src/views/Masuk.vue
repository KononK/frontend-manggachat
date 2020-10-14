<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="card">
          <div class="card-header">Hello</div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for>Email</label>
                <input type="text" v-model="email" name="email" class="form-control" />
              </div>
              <div class="form-group">
                <label for>Room</label>
                <select name="room" v-model="room" class="form-control">
                  <option value selected disabled>Select Room</option>
                  <option value="room1">Room1</option>
                  <option value="room2">Room2</option>
                  <option value="room3">Room3</option>
                  <option value="room4">Room4</option>
                  <option value="room5">Room5</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      room: ''
    }
  },
  methods: {
    handleLogin() {
      this.$router.push({
        name: 'Tes',
        params: { email: this.email, room: this.room }
      })
    }
  }
}
</script>

<style scoped>
</style>
