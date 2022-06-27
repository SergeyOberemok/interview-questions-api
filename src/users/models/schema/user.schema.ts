import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../entities/user.entity';

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
