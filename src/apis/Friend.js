import Api from './Api'
const END_POINT = 'friends'

export default {
  get: (status) => {
    return Api.get(`${END_POINT}/my-friend?status=${status}`)
  },
  post: (data) => {
    return Api.post(`${END_POINT}`, {
      idFriend: data
    })
  },
  acc: (data) => {
    return Api.patch(`${END_POINT}/acc-friend`, {
      idFriend: data
    })
  },
  deleteFriend: (data) => {
    return Api.delete(`${END_POINT}/${data}`)
  },
  refuse: (data) => {
    return Api.patch(`${END_POINT}/refuse-friend`, {
      idFriend: data
    })
  }
}
