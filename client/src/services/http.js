import axios from 'axios'

export const HTTP_TOKEN = axios.create({
  baseURL: 'http://localhost:3002/api/v1/',
  headers: {
    Authorization: 'Bearer {token}',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export const HTTP = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

HTTP_TOKEN.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)
