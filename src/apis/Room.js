import Api from './Api'
const ENDPOINT = 'rooms'

export default {

  getMyRoom: () => {
    return Api.get(`${ENDPOINT}/my-room`)
  },
  getDetailRoom: (id) => {
    return Api.get(`${ENDPOINT}/${id}`)
  },
  addPublicRoom: (data) => {
    return Api.post(`${ENDPOINT}/public-room`, { name: data })
  },
  inviteUser: (data) => {
    return Api.post(`${ENDPOINT}/invite`, data)
  },
  updateRoom: (id, data) => {
    return Api.patch(`${ENDPOINT}/${id}`, data)
  },
  updateInviteStatus: (id) => {
    return Api.patch(`${ENDPOINT}/invite-status/${id}`)
  },
  getMember: (id) => {
    return Api.get(`${ENDPOINT}/member/${id}`)
  },
  changeNotif: (id) => {
    return Api.patch(`${ENDPOINT}/change-notif/${id}`)
  },
  deleteRoom: (id) => {
    return Api.delete(`${ENDPOINT}/${id}`)
  }

}
