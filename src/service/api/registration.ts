import {api} from '@/service/api/index.ts'

export default {
  async createUser(email?: string, password?: string, username?: string) {
    try {
      const params = {
        email: email,
        password: password,
        username: username
      }

      const response = await api.post('/registration/create_user', params)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  },
  async checkUsername(Username: string) {
    try {
      const params = {
        username: Username
      }
      const response = await api.post('/registration/check_username', params)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  },
  async checkEmail(email: string) {
    try {
      const params = {
        email: email
      }
      const response = await api.post('/registration/check_email', params)
      return {
        success: true,
        data: response.data
      }
    } catch (error: any) {
      return {
        success: false,
        error: error
      }
    }
  },
  async checkPassword(psw: string) {
    try {
      const params = {
        password: psw
      }
      const response = await api.post('/registration/check_password', params)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
}
