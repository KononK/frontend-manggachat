import Api from './Api'
const END_POINT = 'users'

export default {
  detail: () => {
    return Api.get(`${END_POINT}/myprofile`)
  },
  updateProfile: (id, data) => {
    return Api.patch(`${END_POINT}/${id}`, data)
  },
  listFriend: status => {
    return Api.get(`${END_POINT}/friend-list?status=${status}`)
  },
  userList: () => {
    return Api.get(`${END_POINT}/user-list`)
  },
  getAll: () => {
    return Api.get(`${END_POINT}`)
  },
  updateLocation: (data) => {
    return Api.patch(`${END_POINT}/update-location`, data)
  },
  updateStatusOnline: (data) => {
    return Api.patch(`${END_POINT}/status-online`, data)
  }
}
