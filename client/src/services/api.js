import axios from 'axios'

export function getUsers() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers');
}

export function getCourses() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getCourses');
}

export function getTeachers() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getTeachers')
}

export function getMatters() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/matters')
}