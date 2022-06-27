export interface UserDto {
  email: string;
  password: string;
}

export type SecureUserDto = Pick<UserDto, 'email'>;
