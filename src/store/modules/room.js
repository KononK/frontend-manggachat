import Room from '@/apis/Room'

// state
const state = {
  allMyRoom: [],
  bcAllMyRoom: [],
  privateRoom: [],
  groupRoom: [],
  allImageInRoom: [],
  allDocInRoom: [],
  roomNotif: localStorage.getItem('notif') || []
}

// getters
const getters = {
  getAllMyRoom: (state) => state.allMyRoom,
  getAllPrivateRoom: (state) => state.privateRoom,
  getAllGroupRoom: (state) => state.groupRoom,
  getAllImageRoom: (state) => state.allImageInRoom,
  getAllDocRoom: (state) => state.allDocInRoom,
  getRoomNotif: (state) => state.roomNotif
}

// actions
const actions = {

  allMyRoom({
    commit,
    rootState
  }) {
    return new Promise((resolve, reject) => {
      Room.allMyRoomSummary().then(response => {
        resolve(response.data)
        const detailUser = rootState.user.user
        commit('ALL_MY_ROOM', {
          data: response.data,
          detailUser
        })
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  updateNotif({ commit }, data) {
    commit('UPDATE_NOTIF', data)
  },
  searchMyRoom({
    commit
  }, data) {
    commit('SEARCH_MY_ROOM', data)
  },
  myPrivateRoom({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Room.allMyRoom().then(response => {
        resolve(response.data)
        commit('MY_PRIVATE_ROOM', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  myGroupRoom({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Room.allMyRoom().then(response => {
        resolve(response.data)
        commit('MY_GROUP_ROOM', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  createPrivateRoom({
    commit,
    dispatch
  }, id) {
    return new Promise((resolve, reject) => {
      Room.createPrivateRoom(id).then(response => {
        resolve(response.data)
        dispatch('allMyRoom')
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  inviteFriend({
    commit,
    dispatch
  }, {
    id,
    data
  }) {
    return new Promise((resolve, reject) => {
      Room.inviteFriend(id, data).then(response => {
        resolve(response.data)
        dispatch('allMyRoom')
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  createPublicRoom({
    commit,
    dispatch
  }, data) {
    return new Promise((resolve, reject) => {
      Room.createPublicRoom(data).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  detailRoom({
    commit
  }, {
    id,
    page
  }) {
    return new Promise((resolve, reject) => {
      Room.detailRoom(id, page).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  detailRoomImage({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      Room.detailRoomImage(id).then(response => {
        resolve(response.data)
        commit('ALL_IMAGE_IN_ROOM', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  detailRoomDocument({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      Room.detailRoomDocument(id).then(response => {
        resolve(response.data)
        commit('ALL_DOC_IN_ROOM', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  findRoom({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      Room.findRoom(id).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  saveMessageToDB({
    commit,
    dispatch,
    rootState,
    state
  }, {
    id,
    message
  }) {
    return new Promise((resolve, reject) => {
      Room.sendMessage(id, message).then(response => {
        resolve(response.data)
        dispatch('allMyRoom')
      }).catch(err => {
        reject(err.response)
      })
    })
  }

}

// mutations
const mutations = {

  ALL_MY_ROOM: (state, payload) => {
    const resultFilter = payload.data.results.map(room => {
      if (room.type === 1) {
        const getName = room.members.filter(
          (item) => item._id !== payload.detailUser._id
        )
        return {
          ...room,
          roomName: getName[0].name
        }
      } else {
        return room
      }
    })
    state.allMyRoom = resultFilter
    state.bcAllMyRoom = resultFilter
    const privateRoom = resultFilter.filter(room => room.type === 1)
    state.privateRoom = privateRoom
    const groupRoom = resultFilter.filter(room => room.type === 2)
    state.groupRoom = groupRoom
  },
  MY_PRIVATE_ROOM: (state, data) => {
    const privateRoom = data.results.filter(room => room.type === 1)
    state.privateRoom = privateRoom
  },
  UPDATE_NOTIF: (state, data) => {
    state.roomNotif = data
  },
  MY_GROUP_ROOM: (state, data) => {
    const groupRoom = data.results.filter(room => room.type === 2)
    state.groupRoom = groupRoom
  },
  SEARCH_MY_ROOM: (state, data) => {
    const searchResult = state.bcAllMyRoom.filter(item => item.roomName.toLowerCase().match(data.toLowerCase()))
    if (data === '') {
      state.allMyRoom = state.bcAllMyRoom
    } else {
      state.allMyRoom = searchResult
    }
  },
  ALL_IMAGE_IN_ROOM: (state, data) => {
    state.allImageInRoom = data.results[0].messages
  },
  ALL_DOC_IN_ROOM: (state, data) => {
    state.allDocInRoom = data.results[0].messages
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
