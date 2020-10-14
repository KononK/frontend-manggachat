import Api from './Api'
const END_POINT = 'auth'

export default {
  register: (data) => {
    return Api.post(`${END_POINT}/register`, data)
  },
  login: (data) => {
    return Api.post(`${END_POINT}/login`, data)
  },
  activateAccount: (data) => {
    return Api.post(`${END_POINT}/activate-account`, data)
  },
  reqResetPassword: (data) => {
    return Api.post(`${END_POINT}/req-reset-password`, data)
  },
  verifyResetPassword: (data) => {
    return Api.post(`${END_POINT}/verify-reset-password`, data)
  },
  resetPassword: (data) => {
    return Api.post(`${END_POINT}/reset-password`, data)
  }
}
