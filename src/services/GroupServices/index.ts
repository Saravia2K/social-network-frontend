import { API_URL } from "../../utils/consts";
import { basicFetch } from "../../utils/helpers";

export default class GroupServices {
  static GROUPS_URL = `${API_URL}/groups`;

  static createGroup = async (
    name: string,
    description: string,
    idUsuarioCreator: number
  ) =>
    basicFetch(this.GROUPS_URL, "POST", {
      name,
      description,
      idUsuarioCreator,
    });

  static joinGroup = async (idUsuario: number, idGroup: number) =>
    basicFetch(`${API_URL}/user-groups`, "POST", {
      idUsuario,
      idGroup,
      state: "ACCEPTED",
    });
}
