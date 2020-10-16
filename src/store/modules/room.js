import Room from '../../apis/Room'

const state = {
  myRoom: [],
  privateRoom: [],
  groupRoom: [],
  detailRoom: {}
}

const getters = {
  getMyRoom: (state) => state.myRoom,
  getPrivateRoom: (state) => state.privateRoom,
  getGroupRoom: (state) => state.groupRoom,
  getDetailRoom: (state) => state.detailRoom
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
  PRIVATE_ROOM: (state) => {
    const privateRoom = state.myRoom.filter(item => item.type === 1)
    state.privateRoom = privateRoom
  },
  GROUP_ROOM: (state) => {
    const groupRoom = state.myRoom.filter(item => item.type === 2)
    state.groupRoom = groupRoom
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
