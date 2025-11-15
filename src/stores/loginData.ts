import {defineStore} from "pinia";
import LoginFunc from "@/service/api/login"
import ApiFunc from "@/service/api/registration.ts";

export const loginStore = defineStore('login', {
  state: () => ({
    token: '',
    token_data: {},
    success: false,
    answer: {}
  }),
  actions: {
    async checkUserCredentials(email: string, password: string) {
      try {
        const response = await LoginFunc.checkUserCredentials(email, password);
        this.token = response.data.token;
        this.token_data = response.data.token_data;
        this.success = true;
      } catch (error) {
        this.success = false;
        throw error;

      }
    },
    async checkEmail (email: string) {
      try {
        const response = await LoginFunc.checkEmail(email)
        this.success = true;
        this.answer = response.data;
      }
      catch (error) {
        throw error;
      }
    },
  }
})
