<template>
  <div>
    <div class="overflow-auto">
      <b-tabs content-class="mt-4">
        <b-tab active>
          <template v-slot:title>
            <b-icon icon="people-fill" />
          </template>
          <b-card-text>
            <div v-if="getMyFriend.length > 0">
              <p>Friends list</p>
              <div v-for="friend in getMyFriend" :key="friend.id">
                <FriendItem :friend="friend" />
              </div>
            </div>
            <div v-else class="text-center">
              <h5 class="text-dark mb-3">No friends yet</h5>
              <button
                class="btn btn-sm btn-success"
                @click="$router.push({ name: 'Users' })"
              >
                Find Friends <b-icon icon="search" />
              </button>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="person-plus-fill" />
            <span v-if="getFriendRequest.length > 0">
              ({{ getFriendRequest.length }})
            </span>
          </template>
          <b-card-text>
            <div v-if="getFriendRequest.length > 0">
              <p>
                List of friend requests
                <b-spinner
                  v-if="getLoading"
                  class="ml-1"
                  type="border"
                  small
                ></b-spinner>
              </p>
              <div v-for="friend in getFriendRequest" :key="friend.id">
                <FriendItem
                  @acc-friend="handleAcc"
                  @reject-friend="handleReject"
                  :friend="friend"
                />
              </div>
            </div>
            <div v-else class="text-center">
              <h5 class="text-dark mb-3">No friends request yet</h5>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="clock-fill" />
            <span v-if="getFriendRequestPending.length > 0">
              ({{ getFriendRequestPending.length }})
            </span>
          </template>
          <b-card-text>
            <div v-if="getFriendRequestPending.length > 0">
              <p>List of pending friend requests</p>
              <div v-for="friend in getFriendRequestPending" :key="friend.id">
                <FriendItem :friend="friend" />
              </div>
            </div>
            <div v-else class="text-center">
              <h5 class="text-dark mb-3">No pending request yet</h5>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="person-x-fill" />
            <span v-if="getFriendRequestRejected.length > 0">
              ({{ getFriendRequestRejected.length }})
            </span>
          </template>
          <b-card-text>
            <div v-if="getFriendRequestRejected.length > 0">
              <p>List of friend requests rejected</p>
              <div v-for="friend in getFriendRequestRejected" :key="friend.id">
                <FriendItem
                  @delete-decline-friend="handleDeleteDeclineFriend"
                  :friend="friend"
                />
              </div>
            </div>
            <div v-else class="text-center">
              <h5 class="text-dark mb-3">No rejected request yet</h5>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import FriendItem from '@/components/molecules/FriendItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    FriendItem
  },
  methods: {
    ...mapActions('friend', [
      'myFriend',
      'accFriend',
      'refuseFriend',
      'deleteFriendRequest'
    ]),
    handleAcc(id) {
      this.confirmSwal('Friends', 'Accept friend requests', 'question', () => {
        this.accFriend(id)
          .then((response) => {
            this.$toast.success('Successfully added to friends list')
          })
          .catch((err) => {
            this.$toast.error(err.data.message)
          })
      })
    },
    handleReject(id) {
      this.confirmSwal('Friends', 'Decline friend requests', 'question', () => {
        this.refuseFriend(id)
          .then((response) => {
            this.$toast.info('Successfully rejected')
          })
          .catch((err) => {
            this.$toast.error(err.data.message)
          })
      })
    },
    handleDeleteDeclineFriend(id) {
      this.deleteFriendRequest(id)
        .then((response) => {
          this.$toast.success('Successfully deleted')
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
        })
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapGetters('friend', [
      'getMyFriend',
      'getFriendRequest',
      'getFriendRequestPending',
      'getFriendRequestRejected'
    ])
  }
}
</script>

<style scoped>
</style>
