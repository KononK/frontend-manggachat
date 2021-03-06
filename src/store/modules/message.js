import Message from '../../apis/Message'

const state = {
  detailMessage: []
}

const getters = {
  getDetailMessage: (state) => state.detailMessage
}

const actions = {
  detailMessage({ commit, dispatch, state }, { id, page }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Message.getDetailMessage(id, page).then(response => {
        resolve(response.data)
        commit('DETAIL_MESSAGE', response.data.data)
        dispatch('room/detailRoom', id, {
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
  detailMessageInfinite({ commit, dispatch }, { id, page }) {
    return new Promise((resolve, reject) => {
      Message.getDetailMessage(id, page).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  sendMessage({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      Message.sendMessage(data).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  deleteMessage({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      Message.deleteMessage(id).then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  },
  clearDetailMessage({ commit }) {
    commit('CLEAR_DETAIL_MESSAGE')
  }
}

const mutations = {
  DETAIL_MESSAGE: (state, payload) => {
    state.detailMessage = payload.reverse()
  },
  CLEAR_DETAIL_MESSAGE: (state, payload) => {
    state.detailMessage = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
