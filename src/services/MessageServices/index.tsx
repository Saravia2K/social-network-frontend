import { API_URL } from "../../utils/consts";
import { basicFetch } from "../../utils/helpers";

export default class MessageServices {
  static async sendMessage(
    idUsuarioFrom: number,
    idUsuarioTo: number,
    message: string
  ) {
    return basicFetch(`${API_URL}/api/messages`, "POST", {
      idUsuarioFrom,
      idUsuarioTo,
      message,
    });
  }
}
