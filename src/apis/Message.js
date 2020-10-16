import Api from './Api'
const ENDPOINT = 'messages'

export default {

  getDetailMessage: (id, page) => {
    return Api.get(`${ENDPOINT}/message-room/${id}?page=${page || 1}`)
  },
  sendMessage: (data) => {
    return Api.post(`${ENDPOINT}`, data)
  },
  deleteMessage: (id) => {
    return Api.patch(`${ENDPOINT}/delete/${id}`)
  }

}
