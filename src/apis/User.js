import Api from './Api'
const END_POINT = 'users'

export default {
  detail: () => {
    return Api.get(`${END_POINT}/profile`)
  },
  updateProfile: (id, data) => {
    return Api.patch(`${END_POINT}/${id}`, data)
  },
  getAll: () => {
    return Api.get(`${END_POINT}`)
  },
  updateLocation: (id, location) => {
    return Api.patch(`${END_POINT}/location/${id}`, { location })
  },
  updateStatusOnline: (id, status) => {
    return Api.patch(`${END_POINT}/isonline/${id}`, { status })
  }
}
