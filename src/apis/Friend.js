import Api from '../apis/Api'
const ENDPOINT = 'friends'

export default {

  getMyFriend: () => {
    return Api.get(`${ENDPOINT}/my-friend`)
  },
  addFriend: (id) => {
    return Api.post(`${ENDPOINT}/req-friend`, { idUser: id })
  },
  accFriend: (id) => {
    return Api.patch(`${ENDPOINT}/acc-friend`, { idUser: id })
  },
  refuseFriend: (id) => {
    return Api.patch(`${ENDPOINT}/refuse-friend`, { idUser: id })
  },
  deleteFriendRequest: (id) => {
    return Api.delete(`${ENDPOINT}/${id}`)
  }

}
