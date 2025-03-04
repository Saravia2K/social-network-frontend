export type TUser = {
  id: number;
  username: string;
  email: string;
  cellphone: string;
  webPage: string;
  address: string;
  birthDate: string;
  profilePic: string;
  description: string;
};

export type RegisterUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type TLoginResponse =
  | {
      success: false;
      message: string;
    }
  | {
      success: true;
      user: TUser;
    };
