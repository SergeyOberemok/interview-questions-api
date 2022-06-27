import { UserDto } from './user.dto';

export class CreateUserDto implements UserDto {
  email: string;
  password: string;
}
