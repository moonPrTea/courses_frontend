import axios from 'axios'
import {getToken} from "@/composables/login.ts";

const baseURL = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`

    if (config.data && token) {
      config.data= {
        ...config.data,
        token,
      }
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

