import { API_URL } from "../../utils/consts";
import { TErrorResponse } from "../../utils/types";
import { RegisterUserDTO } from "./types";

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
}
