import User from '@/apis/User'

// state
const state = {
  user: {},
  privateMessage: {},
  userList: [],
  listFriend: []
}

// getters
const getters = {
  getDetailUser: (state) => state.user,
  getListUser: (state) => state.userList,
  getPrivateMessage: (state) => state.privateMessage,
  getListFriend: (state) => state.listFriend
}

// actions
const actions = {

  updateUser({
    dispatch
  }, {
    id,
    data
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.updateProfile(id, data).then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('detailUser')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  updateLocation({
    dispatch
  }, data) {
    return new Promise((resolve, reject) => {
      User.updateLocation(data).then(response => {
        resolve(response.data)
        dispatch('detailUser')
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  updateStatusOnline({
    dispatch
  }, data) {
    return new Promise((resolve, reject) => {
      User.updateStatusOnline(data).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },

  detailUser({
    commit
  }) {
    return new Promise((resolve, reject) => {
      User.detail().then(response => {
        resolve(response.data)
        commit('GET_DETAIL_USER', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  listUser({
    commit
  }) {
    return new Promise((resolve, reject) => {
      User.userList().then(response => {
        resolve(response.data)
        commit('GET_LIST_USER', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  listFriend({
    commit
  }) {
    return new Promise((resolve, reject) => {
      User.listFriend('acc').then(response => {
        resolve(response.data)
        commit('GET_LIST_FRIEND', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  selectPrivateMessage({
    commit
  }, data) {
    console.log(data)
    commit('SELECT_PRIVATE_MESSAGE', data)
  },
  clearPrivateMessage({
    commit
  }) {
    commit('CLEAR_PRIVATE_MESSAGE')
  }

}

// mutations
const mutations = {

  GET_DETAIL_USER: (state, data) => {
    state.user = data.results
  },
  GET_LIST_USER: (state, data) => {
    state.userList = data.results
  },
  GET_LIST_FRIEND: (state, data) => {
    state.listFriend = data.results
  },
  SELECT_PRIVATE_MESSAGE: (state, data) => {
    state.privateMessage = data
  },
  CLEAR_PRIVATE_MESSAGE: (state) => {
    state.privateMessage = {}
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
