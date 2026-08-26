import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { IUser } from './user.model';

@Schema()
export class User implements IUser {
  @Prop({ required: true })
  @ApiProperty()
  email: string;
  @Prop({ required: true })
  @ApiProperty()
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
