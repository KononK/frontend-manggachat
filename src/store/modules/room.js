import Room from '../../apis/Room'

const state = {
  myRoom: [],
  privateRoom: [],
  memberRoom: [],
  groupRoom: [],
  detailRoom: {}
}

const getters = {
  getMyRoom: (state) => state.myRoom,
  getPrivateRoom: (state) => state.privateRoom,
  getGroupRoom: (state) => state.groupRoom,
  getDetailRoom: (state) => state.detailRoom,
  getMemberRoom: (state) => state.memberRoom
}

const actions = {
  myRoom({ commit, dispatch }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.getMyRoom().then(response => {
        resolve(response.data)
        commit('MY_ROOM', response.data.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  memberRoom({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.getMember(id).then(response => {
        resolve(response.data)
        commit('MEMBER_ROOM', response.data.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  addPublicRooms({ commit, dispatch }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.addPublicRoom(data).then(response => {
        resolve(response.data)
        dispatch('myRoom')
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  inviteUser({ commit, dispatch }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.inviteUser(data).then(response => {
        resolve(response.data)
        dispatch('memberRoom', data.idRoom)
        dispatch('myRoom')
        dispatch('message/detailMessage', { id: data.idRoom, page: 1 }, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  updateRoom({ commit, dispatch }, { id, data }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.updateRoom(id, data).then(response => {
        resolve(response.data)
        dispatch('detailRoom', id)
        dispatch('myRoom')
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  updateInviteStatus({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.updateInviteStatus(id).then(response => {
        resolve(response.data)
        dispatch('detailRoom', id)
        dispatch('myRoom')
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  deleteRoom({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Room.deleteRoom(id).then(response => {
        resolve(response.data)
        dispatch('clearDetailRoom')
        dispatch('myRoom')
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  detailRoom({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      Room.getDetailRoom(id).then(response => {
        resolve(response.data)
        commit('DETAIL_ROOM', response.data.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  changeNotif({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      Room.changeNotif(id).then(response => {
        resolve(response.data)
        dispatch('myRoom')
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  clearDetailRoom({ commit, dispatch }) {
    dispatch('message/clearDetailMessage', null, {
      root: true
    })
    commit('CLEAR_DETAIL_ROOM')
  },
  privateRoom({ commit }) {
    commit('PRIVATE_ROOM')
  },
  groupRoom({ commit }) {
    commit('GROUP_ROOM')
  }
}

const mutations = {
  MY_ROOM: (state, payload) => {
    state.myRoom = payload
  },
  DETAIL_ROOM: (state, payload) => {
    state.detailRoom = payload
  },
  CLEAR_DETAIL_ROOM: (state, payload) => {
    state.detailRoom = {}
  },
  PRIVATE_ROOM: (state) => {
    const privateRoom = state.myRoom.filter(item => item.type === 1)
    state.privateRoom = privateRoom
  },
  GROUP_ROOM: (state) => {
    const groupRoom = state.myRoom.filter(item => item.type === 2)
    state.groupRoom = groupRoom
  },
  MEMBER_ROOM: (state, payload) => {
    state.memberRoom = payload
  },
  CLEAR_ROOM: (state) => {
    state.myRoom = []
    state.privateRoom = []
    state.memberRoom = []
    state.groupRoom = []
    state.detailRoom = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
