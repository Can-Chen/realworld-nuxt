import {
  request
} from "../plugins/request";


export const login = (data) => {
  return request({
    method: "POST",
    url: '/api/users/login',
    data
  })
}


export const register = (data) => {
  return request({
    method: "POST",
    url: '/api/users',
    data
  })
}

export const getUserInfo = () => {
  return request({
    method: "GET",
    url: '/api/user'
  })
}

export const updateUserInfo = (data) => {
  return request({
    method: "PUT",
    url: '/api/user',
    data: {
      user: data
    }
  })
}