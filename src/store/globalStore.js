import io from 'socket.io-client'
// state
const state = {
  isLoading: false,
  firstLoading: false,
  socket: io(process.env.VUE_APP_BACKEND)
}

// getters
const getters = {
  getLoading: (state) => state.isLoading,
  getFirstLoading: (state) => state.firstLoading
}

// actions
const actions = {
  changeIsLoading({
    commit
  }, status) {
    commit('CHANGE_IS_LOADING', status)
  },
  changeFirstLoading({
    commit
  }, status) {
    commit('CHANGE_FIRST_LOADING', status)
  }

}

// mutations
const mutations = {

  CHANGE_IS_LOADING: (state, status) => {
    state.isLoading = status
  },
  CHANGE_FIRST_LOADING: (state, status) => {
    state.firstLoading = status
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
