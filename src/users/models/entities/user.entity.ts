import { Prop, Schema } from '@nestjs/mongoose';
import { UserDto } from '../dto/user.dto';

@Schema()
export class User implements UserDto {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
}
