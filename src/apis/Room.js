import Api from './Api'
const ENDPOINT = 'rooms'

export default {

  getMyRoom: () => {
    return Api.get(`${ENDPOINT}/my-room`)
  },
  getDetailRoom: (id) => {
    return Api.get(`${ENDPOINT}/${id}`)
  }

}
