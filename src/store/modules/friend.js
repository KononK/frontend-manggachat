import Friend from '@/apis/Friend'
import User from '@/apis/User'

// state
const state = {
  listFriend: [],
  listPendingFriend: [],
  listRequestFriend: [],
  listUserNotFriend: [],
  listRefuseFriend: []
}

// getters
const getters = {
  getListFriend: (state) => state.listFriend,
  getListPendingFriend: (state) => state.listPendingFriend,
  getListRequestFriend: (state) => state.listRequestFriend,
  getListUserNotFriend: (state) => state.listUserNotFriend,
  getListRefuseFriend: (state) => state.listRefuseFriend
}

// actions
const actions = {

  addFriend({
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.post(id).then(response => {
        resolve(response.data)
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
  accFriend({
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.acc(id).then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('listFriend')
        dispatch('listPendingFriend')
        dispatch('listRequestFriend')
        dispatch('listUserNotFriend')
        dispatch('listRefuseFriend')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  refuseFriend({
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.refuse(id).then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('listFriend')
        dispatch('listPendingFriend')
        dispatch('listRequestFriend')
        dispatch('listUserNotFriend')
        dispatch('listRefuseFriend')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  deleteFriend({
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Friend.deleteFriend(id).then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('listFriend')
        dispatch('listPendingFriend')
        dispatch('listRequestFriend')
        dispatch('listUserNotFriend')
        dispatch('listRefuseFriend')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },

  listFriend({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Friend.get('acc').then(response => {
        resolve(response.data)
        commit('GET_LIST_FRIEND', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  listPendingFriend({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Friend.get('pending').then(response => {
        resolve(response.data)
        commit('GET_LIST_PENDING_FRIEND', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  listRefuseFriend({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Friend.get('refuse').then(response => {
        resolve(response.data)
        commit('GET_LIST_REFUSE_FRIEND', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  listRequestFriend({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Friend.get('request').then(response => {
        resolve(response.data)
        commit('GET_LIST_REQUEST_FRIEND', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  listUserNotFriend({
    commit
  }) {
    return new Promise((resolve, reject) => {
      User.getAll().then(response => {
        resolve(response.data)
        commit('GET_LIST_USER_NOT_FRIEND', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  }

}

// mutations
const mutations = {
  GET_LIST_FRIEND: (state, data) => {
    state.listFriend = data.results
  },
  GET_LIST_PENDING_FRIEND: (state, data) => {
    state.listPendingFriend = data.results
  },
  GET_LIST_REQUEST_FRIEND: (state, data) => {
    state.listRequestFriend = data.results
  },
  GET_LIST_REFUSE_FRIEND: (state, data) => {
    state.listRefuseFriend = data.results
  },
  GET_LIST_USER_NOT_FRIEND: (state, data) => {
    const listFriend = state.listFriend.map(friend => friend.idFriend._id)
    var filtered = data.results.filter(
      // eslint-disable-next-line space-before-function-paren
      function (e) {
        return this.indexOf(e._id) < 0
      },
      listFriend
    )
    state.listUserNotFriend = filtered
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
