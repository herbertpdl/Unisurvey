import axios from 'axios'

//LOGIN
export function login(data) {
  return axios.post('http://localhost:3002/api/v1/auth', data).then(resp => resp.data)
}

//USERS
export function getUsers() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers').then(resp => resp.data)
}

export function getUser(id) {
  return axios.get(`https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers/${id}`).then(resp => resp.data)
}

export function saveUser(data) {
  return axios.post('http://localhost:3002/api/v1/user', data).then(resp => resp.data)
}

export function deleteUser(id) {
  return axios.delete(`https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers/${id}`).then(resp => resp.data)
}

export function getTeachers() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getUsers').then(resp => resp.data)
}

//COURSES
export function getCourses() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getCourses').then(resp => resp.data)
}

export function saveCourse(data) {
  return axios.post('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/getCourses', data).then(resp => resp.data)
}


//MATTERS
export function getMatters() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/matters').then(resp => resp.data)
}

export function saveMatter(data) {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/matters', data).then(resp => resp.data)
}

//QUESTIONS
export function getQuestions() {
  return axios.get('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/questions').then(resp => resp.data)
}

export function getQuestion(id) {
  return axios.get(`https://5d891031b2568e0014d878d9.mockapi.io/api/v1/questions/${id}`).then(resp => resp.data)
}

export function saveQuestion(data) {
  return axios.post('https://5d891031b2568e0014d878d9.mockapi.io/api/v1/questions', data).then(resp => resp.data)
}

export function deleteQuestion(id) {
  return axios.delete(`https://5d891031b2568e0014d878d9.mockapi.io/api/v1/questions/${id}`).then(resp => resp.data)
}