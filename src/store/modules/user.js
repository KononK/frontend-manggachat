import User from '@/apis/User'

// state
const state = {
  user: {},
  users: []
}

// getters
const getters = {
  getAllUser: (state) => state.users,
  getDetailUser: (state) => state.user
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
        console.log(err)
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },
  allUser({
    dispatch,
    commit
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.getAll().then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        commit('ALL_USER', response.data.data)
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
  }, { id, location }) {
    return new Promise((resolve, reject) => {
      User.updateLocation(id, location).then(response => {
        resolve(response.data)
        dispatch('detailUser')
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  updateStatusOnline({
    dispatch
  }, { id, status }) {
    return new Promise((resolve, reject) => {
      User.updateStatusOnline(id, status).then(response => {
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
  }

}

// mutations
const mutations = {

  GET_DETAIL_USER: (state, data) => {
    state.user = data.data
  },
  ALL_USER: (state, payload) => {
    state.users = payload.map(item => {
      return { ...item, isLoading: false }
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
