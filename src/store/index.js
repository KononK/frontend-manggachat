import Vue from 'vue'
import Vuex from 'vuex'

import globalStore from './globalStore'
import auth from './modules/auth'
import user from './modules/user'
import room from './modules/room'
import friend from './modules/friend'
import message from './modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
  ...globalStore,
  modules: {
    auth,
    user,
    room,
    friend,
    message
  }
})
