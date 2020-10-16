import Friend from '../../apis/Friend'

const state = {
  myFriend: [],
  friendRequest: [],
  friendRequestPending: [],
  friendRequestRejected: []
}

const getters = {
  getMyFriend: (state) => state.myFriend,
  getFriendRequest: (state) => state.friendRequest,
  getFriendRequestPending: (state) => state.friendRequestPending,
  getFriendRequestRejected: (state) => state.friendRequestRejected
}

const actions = {

  myFriend({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      Friend.getMyFriend().then(response => {
        resolve(response.data)
        commit('MY_FRIEND', { data: response.data.data, id: rootState.user.user.id })
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  addFriend({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.addFriend(id).then(response => {
        resolve(response.data)
        dispatch('myFriend')
        dispatch('user/allUser', null, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        reject(err.response)
        dispatch('changeIsLoading', false, {
          root: true
        })
      })
    })
  },
  accFriend({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.accFriend(id).then(response => {
        resolve(response.data)
        dispatch('myFriend')
        dispatch('user/allUser', null, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        reject(err.response)
        dispatch('changeIsLoading', false, {
          root: true
        })
      })
    })
  },
  refuseFriend({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.refuseFriend(id).then(response => {
        resolve(response.data)
        dispatch('myFriend')
        dispatch('user/allUser', null, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        reject(err.response)
        dispatch('changeIsLoading', false, {
          root: true
        })
      })
    })
  },
  deleteFriendRequest({ commit, dispatch }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.deleteFriendRequest(id).then(response => {
        resolve(response.data)
        dispatch('myFriend')
        dispatch('user/allUser', null, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
      }).catch(err => {
        reject(err.response)
        dispatch('changeIsLoading', false, {
          root: true
        })
      })
    })
  }

}

const mutations = {

  MY_FRIEND: (state, payload) => {
    state.myFriend = payload.data.filter(item => item.status === 1)
    state.friendRequestPending = payload.data.filter(item => {
      return item.status === 0 && item.idSender === payload.id && item.idUser === payload.id
    })
    state.friendRequest = payload.data.filter(item => {
      return item.status === 0 && item.idUser === payload.id && item.idSender !== payload.id
    })
    state.friendRequestRejected = payload.data.filter(item => {
      return item.status === 2 && item.idUser === payload.id && item.idSender === payload.id
    })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
