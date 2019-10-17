import axios from 'axios'
import { HTTP, HTTP_TOKEN } from './http';

//LOGIN
export function login(data) {
  return axios.post('http://localhost:3002/api/v1/auth', data).then(resp => resp.data)
}

export function getUsers() {
  return HTTP_TOKEN.get(`users`).then(resp => resp.data )
}

export function getTeachers() {
  return HTTP_TOKEN.get(`teachers`).then(resp => resp.data )
}

export function getUser(id) {
  return HTTP_TOKEN.get(`user/${id}`).then(resp => resp.data)
}

export function saveUser(data) {
  return HTTP_TOKEN.post('http://localhost:3002/api/v1/user', data).then(resp => resp.data)
}

export function deleteUser(id) {
  return HTTP_TOKEN.delete(`user/${id}`).then(resp => resp.data)
}

export function updateUser(id, data) {
  return HTTP_TOKEN.put(`user/${id}`, data).then(resp => resp.data)
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
  return HTTP_TOKEN.get(`matters`).then(resp => resp.data)
}

export function saveMatter(data) {
  return HTTP_TOKEN.post(`matter`, data).then(resp => resp.data)
}

//QUESTIONS
export function getQuestions() {
  return HTTP_TOKEN.get(`question`).then(resp => resp.data)
}

export function getQuestion(id) {
  return  HTTP_TOKEN.get(`question/${id}`).then(resp => resp.data)
}

export function saveQuestion(data) {
  return  HTTP_TOKEN.post(`question`, data).then(resp => resp.data)
}

export function deleteQuestion(id) {
  return  HTTP_TOKEN.delete(`question/${id}`).then(resp => resp.data)
}