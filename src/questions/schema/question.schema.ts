import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ILabel, Label, LabelSchema } from 'src/labels/schemas/label.schema';
import { Answer, AnswerSchema, IAnswer } from './answer.schema';

export interface IQuestion {
  description: string;
  answers: IAnswer[];
  labels: ILabel[];
  notes?: string;
  image?: Buffer;
}

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
})
export class Question implements IQuestion {
  @Prop({ required: true })
  description: string;
  @Prop([AnswerSchema])
  answers: Answer[];
  @Prop()
  notes: string;
  @Prop([LabelSchema])
  labels: Label[];
  @Prop({
    type: Buffer,
    transform: (img) => `data:image/png;base64,${img.toString('base64')}`,
  })
  image: Buffer;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

export type QuestionDocumentOverride = {
  answers: Types.DocumentArray<Answer>;
  labels: Types.DocumentArray<Label>;
};
export type QuestionDocument = HydratedDocument<
  Question,
  QuestionDocumentOverride
>;
