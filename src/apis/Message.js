import Api from './Api'
const ENDPOINT = 'messages'

export default {

  getDetailMessage: (id, page) => {
    return Api.get(`${ENDPOINT}/message-room/${id}?page=${page || 1}`)
  }

}
