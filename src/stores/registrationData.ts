import {defineStore} from "pinia";
import ApiFunc from "@/service/api/registration"

export const registrationStore = defineStore('registration', {
  state: () => ({
    success: false,
    user_id: 0,
    answer: {}
  }),
  actions: {
    async checkUser(email?: string, password?: string, username?: string) {
      try {
        const response = await ApiFunc.createUser(email, password, username);
        this.success = true;
        this.user_id = response.data.user_id;
      } catch (error) {
        throw error;
      }
    },
    async checkUsername (username: string) {
      try {
        const response = await ApiFunc.checkUsername(username)
        this.success = true;
        this.answer = response.data;
      }
      catch (error) {
        throw error;
      }
    },
    async checkEmail (email: string) {
      try {
        const response = await ApiFunc.checkEmail(email)
        this.success = true;
        this.answer = response.data;
      }
      catch (error) {
        throw error;
      }
    },
    async checkPassword (psw: string) {
      try {
        const response = await ApiFunc.checkPassword(psw)
        this.success = true;
        this.answer = response.data;
      }
      catch (error) {
        throw error;
      }
    }
  }
})
