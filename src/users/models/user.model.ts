export interface IUser {
  email: string;
  password: string;
}

export interface IUserToken extends Pick<IUser, 'email'> {
  token: string;
}
