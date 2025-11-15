import {api} from '@/service/api/index.ts'
import {getToken} from "@/composables/login.ts";
import type {T, Token} from "@/interfaces/login.ts";

export default {
  async deleteToken() {
    const token = getToken() as Token;
    try {
      const response = await api.post(`/token/delete/${token.token}`);
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  }
}
