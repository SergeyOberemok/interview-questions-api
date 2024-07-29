import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IQuestion {
  description: string;
  answers: string[];
  labels: string[];
}

@Schema({
  toJSON: { virtuals: true, versionKey: false },
})
export class Question implements IQuestion {
  @Prop({ required: true })
  description: string;
  @Prop()
  answers: string[];
  @Prop()
  labels: string[];
}

export type QuestionDocument = HydratedDocument<Question>;
export const QuestionSchema = SchemaFactory.createForClass(Question);
