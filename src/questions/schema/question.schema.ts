import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IQuestion,
  Question as QuestionBase,
} from '../entities/question.entity';

@Schema()
export class Question extends QuestionBase implements IQuestion {
  @Prop({ required: true })
  description: string;
  @Prop()
  answers: string[];
  @Prop()
  labels: string[];
}

export type QuestionDocument = HydratedDocument<Question>;
export const QuestionSchema = SchemaFactory.createForClass(Question);
