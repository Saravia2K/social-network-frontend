import { API_URL } from "../../utils/consts";
import { basicFetch } from "../../utils/helpers";
import { RegisterUserDTO, TUser } from "./types";

export default class UserServices {
  static USERS_URL = `${API_URL}/usuarios`;

  static register = async (data: RegisterUserDTO) =>
    basicFetch(`${this.USERS_URL}/registro`, "POST", data);

  static login = async (username: string, password: string) =>
    basicFetch(
      `${this.USERS_URL}/login`,
      "POST",
      { username, password },
      (user: TUser) => ({
        user,
      })
    );
}
