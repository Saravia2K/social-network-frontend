import { API_URL } from "../../utils/consts";
import { TErrorResponse } from "../../utils/types";
import { RegisterUserDTO, TLoginResponse, TUser } from "./types";

export default class UserServices {
  static USERS_URL = `${API_URL}/usuarios`;

  static async register(data: RegisterUserDTO) {
    const response = await fetch(`${this.USERS_URL}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { message } = (await response.json()) as TErrorResponse;
      return {
        success: false,
        message,
      };
    }

    return {
      success: true,
    };
  }

  static async login(
    username: string,
    password: string
  ): Promise<TLoginResponse> {
    const response = await fetch(`${this.USERS_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const loginOk = response.ok;
    const data = await response.json();
    if (!loginOk) {
      const { message } = data as TErrorResponse;
      return {
        success: false,
        message,
      };
    }

    const user = data as TUser;
    return {
      success: true,
      user,
    };
  }
}
