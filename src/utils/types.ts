import { TUser } from "../services/UserServices/types";
import { POST_STATE } from "./enums";

export type TErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  trace: string;
  message: string;
  path: string;
};

export type TPost = {
  id: number;
  idUsuario: TUser;
  idGroup: number | null;
  subject: string;
  content: string;
  postDate: string;
  state: POST_STATE;
};

export type TGroup = {
  id: number;
  name: string;
  description: string;
  idUsuarioCreador: number;
};

export type TMessage = {
  id: number;
  idUsuarioFrom: TUser;
  idUsuarioTo: TUser;
  date: string;
  message: string;
};

export type TGroupMember = {
  id: number;
  idUsuario: TUser;
  idGroup: TGroup;
  state: string;
  joinDate: string;
};

export type TModerator = {
  id: number;
  idUsuario: TUser;
  idGroup: TGroup;
};
