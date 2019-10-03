import axios from 'axios'

export function getUsers() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers').then(resp => resp.data)
}

export function saveUser(data) {
  return axios.post('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers', data).then(resp => resp.data)
}

export function getCourses() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getCourses').then(resp => resp.data)
}

export function getTeachers() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getTeachers').then(resp => resp.data)
}

export function getMatters() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/matters').then(resp => resp.data)
}