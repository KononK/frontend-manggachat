import Api from './Api'
const ENDPOINT = 'rooms'

export default {
  allMyRoom: () => {
    return Api.get(`${ENDPOINT}/my-room`)
  },
  allMyRoomSummary: () => {
    return Api.get(`${ENDPOINT}/my-room-summary`)
  },
  detailRoom: (id, page) => {
    return Api.get(`${ENDPOINT}/${id}?page=${page || 1}`)
  },
  detailRoomImage: (id) => {
    return Api.get(`${ENDPOINT}/room-image/${id}`)
  },
  detailRoomDocument: (id) => {
    return Api.get(`${ENDPOINT}/room-document/${id}`)
  },
  findRoom: (id) => {
    return Api.get(`${ENDPOINT}/find-room/${id}`)
  },
  createPrivateRoom: (id) => {
    return Api.post(`${ENDPOINT}/add-private-room`, {
      idFriend: id
    })
  },
  createPublicRoom: (name) => {
    return Api.post(`${ENDPOINT}/add-public-room`, {
      roomName: name
    })
  },
  sendMessage: (id, data) => {
    return Api.patch(`${ENDPOINT}/send-message/${id}`, data)
  },
  inviteFriend: (id, data) => {
    return Api.patch(`${ENDPOINT}/invite-user/${id}`, {
      idUser: data
    })
  }
}
