import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IAnswer {
  title?: string;
  answer: string;
  type?: string;
  note?: string;
}

@Schema({
  toJSON: { versionKey: false },
})
export class Answer implements IAnswer {
  @Prop()
  title?: string;
  @Prop({ required: true })
  answer: string;
  @Prop()
  type?: string;
  @Prop()
  note?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

export type AnswerDocucume = HydratedDocument<Answer>;
