import {api} from '@/service/api/index.ts'

export default {
  async checkUserCredentials(email: string, password: string) {
    try {
      const params = {
        email: email,
        password: password
      }

      const response = await api.post('/login/check_credentials', params)

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
      const response = await api.post('/login/check_login_email', params)
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
}
