import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IQuestion,
  Question as QuestionBase,
} from '../entities/question.entity';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question extends QuestionBase implements IQuestion {
  @Prop({ required: true })
  description: string;
  @Prop()
  answers: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
