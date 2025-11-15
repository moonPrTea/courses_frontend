import type {Token} from "@/interfaces/login.ts";
import Cookies from "js-cookie";


export const setToken = (tokenData: Token): void => { // --> запись токена в cookies
  const expiresTime = new Date(tokenData.expires_time);
  Cookies.set(
    'auth-token', JSON.stringify(tokenData), {
      expires: expiresTime,
      sameSite: 'Strict'
  })
  getToken();
}

export const getToken = (): Token | false => { // --> получение токена
  const token = Cookies.get('auth-token');
  console.log(token);
  return token ? JSON.parse(token) : false;
}

export const clearToken = (): void => {
  Cookies.remove('auth-token');
}
