import {defineStore} from "pinia";
import ApiFunc from "@/service/api/token"

export const tokenStore = defineStore('token', {
  state: () => ({
    success: false,
    user_id: 0
  }),
  actions: {
    async deleteToken() {
      try {
        const response = await ApiFunc.deleteToken();
        this.success = true;
      } catch (error) {
        throw error;
      }
    },
  }
})
