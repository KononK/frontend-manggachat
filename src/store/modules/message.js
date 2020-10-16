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
  }
}

const mutations = {
  DETAIL_MESSAGE: (state, payload) => {
    state.detailMessage = payload.reverse()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
