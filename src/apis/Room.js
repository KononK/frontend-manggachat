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
  changeNotif: (id) => {
    return Api.patch(`${ENDPOINT}/change-notif/${id}`)
  }

}
