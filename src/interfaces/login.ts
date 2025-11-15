import type {UserTokenData} from "@/interfaces/user.ts";

export interface Token {
  token: string;
  expires_time: number;
  token_data: UserTokenData;
}

export interface T {
  token: string;
}




