import { API_URL } from "../../utils/consts";
import { POST_STATE } from "../../utils/enums";
import { basicFetch } from "../../utils/helpers";
import { TUser } from "../UserServices/types";

export default class PostServices {
  static POSTS_URL = `${API_URL}/posts`;

  static createPost = async (body: Props) =>
    basicFetch(this.POSTS_URL, "POST", body);
}

type Props = {
  idUsuario: number;
  idGroup?: number;
  subject: string;
  content: string;
  state: POST_STATE;
};

export type TResponse = Props & {
  id: number;
  idUsuario: TUser;
};
