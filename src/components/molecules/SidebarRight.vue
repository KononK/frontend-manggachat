<template>
  <b-sidebar id="sidebar-right" width="400px" right shadow>
    <h5 class="mb-0 color-lb font-18 text-center mb-3">
      {{
        getDetailRoom.type === 2 ? getDetailRoom.name : getPrivate.friendName
      }}
    </h5>
    <div class="px-3 py-2">
      <div class="contact-image text-center">
        <b-avatar
          v-if="getDetailRoom.type === 2"
          :text="`${getDetailRoom.name[0]}${
            getDetailRoom.name[getDetailRoom.name.length - 1]
          }`"
          class="no-image-avatar"
        ></b-avatar>
        <span v-b-modal.modal-chat @click="handleImaged(getPrivate.image)">
          <b-avatar
            v-if="getDetailRoom.type === 1"
            :src="getPrivate.image"
            class="no-image-avatar"
          ></b-avatar>
        </span>
      </div>
      <div class="border-bottom pb-3 mt-4">
        <div>
          <p class="font-16 weight-500 mb-1">
            {{
              getDetailRoom.type === 2
                ? getDetailRoom.name
                : getPrivate.friendName
            }}
          </p>
          <p class="phone-number weight-400 mb-1 font-13">
            <span v-if="getDetailRoom.type === 2">Group</span>
            <span v-if="getDetailRoom.type === 1">
              {{ getPrivate.statusOnine === 1 ? 'Online' : 'Offline' }}
            </span>
          </p>
        </div>
        <div class="mt-4" v-if="getDetailRoom.type === 2">
          <p class="font-16 weight-500 mb-1">
            Description
            <span
              v-if="getStatusUser === 1"
              class="cursor-pointer ml-1"
              @click="toggleEditDescription"
              ><b-icon icon="pencil-fill"
            /></span>
          </p>
          <div v-if="showEditDescription">
            <b-form-textarea
              class="mt-3"
              id="textarea"
              v-model="description"
              placeholder="Description group..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <g-button
              :isLoading="localLoading"
              @cus-click="handleUpdateRoom"
              class="btn btn-primary btn-sm float-right mt-2"
              >Save</g-button
            >
            <div class="clearfix"></div>
          </div>
          <p
            v-if="!showEditDescription"
            class="phone-number weight-400 mb-1 font-13"
          >
            {{
              getDetailRoom.description
                ? getDetailRoom.description
                : 'Belum diset'
            }}
          </p>
        </div>
        <div
          class="mt-4"
          v-if="getDetailRoom.type === 2 && getStatusUser === 1"
        >
          <p class="font-16 weight-500 mb-1">Setting</p>
          <div>
            Member can invite friend:
            <input
              type="checkbox"
              name="checkStatus"
              @click="handleInviteStatus"
              :checked="getDetailRoom.memberCanInvite ? 'checked' : ''"
            />
          </div>
          <g-button
            v-if="getMemberRoom.length === 1 && getStatusUser === 1"
            class="btn mt-3 btn-danger btn-sm"
            @cus-click="handleDeleteRoom"
            :isLoading="getLoading"
          >
            <b-icon icon="trash-fill" /> Delete Permanent Group
          </g-button>
        </div>
        <div class="mt-4" v-if="getDetailRoom.type === 1">
          <p class="font-16 weight-500 mb-1">Phone Number</p>
          <p class="phone-number weight-400 mb-1 font-13">
            {{
              getPrivate.phoneNumber ? getPrivate.phoneNumber : 'Belum diset'
            }}
          </p>
        </div>
        <div class="mt-4" v-if="getDetailRoom.type === 1">
          <p class="font-16 weight-500 mb-1">Bio</p>
          <p class="phone-number weight-400 mb-1 font-13">
            {{ getPrivate.bio ? getPrivate.bio : 'Belum diset' }}
          </p>
        </div>
      </div>
      <TabSidebarRight @detail-imaged="handleImaged" />
    </div>
    <!-- <ModalInvite /> -->
  </b-sidebar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TabSidebarRight from '@/components/molecules/TabSidebarRight'
// import ModalInvite from '@/components/molecules/ModalInvite'
export default {
  data() {
    return {
      location: {
        lat: 1,
        lng: 1
      },
      deailImage: '',
      description: '',
      showEditDescription: false,
      localLoading: false
    }
  },
  components: {
    // ModalInvite,
    TabSidebarRight
  },
  mounted() {
    this.checkInvite = this.getDetailRoom.memberCanInvite
  },
  methods: {
    ...mapActions('room', ['updateRoom', 'updateInviteStatus', 'deleteRoom']),
    handleImaged(val) {
      this.$emit('detail-image', val)
    },
    toggleEditDescription() {
      this.description = this.getDetailRoom.description

      this.showEditDescription = !this.showEditDescription
    },
    handleDeleteRoom() {
      this.confirmDelete('Room', () => {
        this.deleteRoom(this.getDetailRoom.idRoom)
          .then((response) => {
            this.$toast.success(response.data.message)
          })
          .catch((err) => {
            this.$toast.success(err.data.message)
          })
      })
    },
    handleInviteStatus() {
      this.localLoading = true
      this.updateInviteStatus(this.getDetailRoom.idRoom)
        .then((response) => {
          this.$toast.success('Success updated')
          this.localLoading = false
        })
        .catch((err) => {
          this.$toast.error(err.data.message)
          this.localLoading = false
        })
    },
    handleUpdateRoom() {
      if (this.description === '') {
        this.$toast.error('Description required')
      } else {
        this.localLoading = true
        const data = {
          id: this.getDetailRoom.idRoom,
          data: {
            description: this.description,
            name: this.getDetailRoom.name
          }
        }
        this.updateRoom({ ...data })
          .then((response) => {
            this.$toast.success('Description updated')
            this.localLoading = false
            this.showEditDescription = false
          })
          .catch((err) => {
            this.$toast.error(err.data.message)
            this.localLoading = false
            this.showEditDescription = false
          })
      }
    }
  },
  computed: {
    ...mapGetters('room', ['getDetailRoom', 'getMemberRoom']),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters('friend', ['getMyFriend']),
    ...mapGetters(['getLoading']),
    getPrivate() {
      if (this.getDetailRoom.type === 1) {
        if (this.getDetailRoom.idSender === this.getDetailUser.id) {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.getDetailRoom.idReceiver
          )[0]
        } else {
          return this.getMyFriend.filter(
            (item) => item.idFriend === this.getDetailRoom.idSender
          )[0]
        }
      } else {
        return 'NAH'
      }
    },
    getStatusUser() {
      const user = this.getMemberRoom.filter(
        (member) => member.idUser === this.getDetailUser.id
      )[0]
      return user.status
    }
  }
}
</script>

<style scoped>
.contact-image img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}
.no-image-avatar {
  width: 72px;
  height: 72px;
  border-radius: 20px !important;
}
/* width */
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #7e98df;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7e98df;
}
</style>
