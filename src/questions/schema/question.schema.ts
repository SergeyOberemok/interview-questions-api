import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { ILabel, Label, LabelSchema } from 'src/labels/schemas/label.schema';
import { Answer, AnswerSchema, IAnswer } from './answer.schema';

export interface IQuestion {
  definition: string;
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
  @ApiProperty()
  definition: string;
  @Prop([AnswerSchema])
  @ApiProperty({ type: () => Answer, isArray: true })
  answers: Answer[];
  @Prop()
  @ApiPropertyOptional()
  notes: string;
  @Prop([LabelSchema])
  @ApiProperty({ type: () => Label, isArray: true })
  labels: Label[];
  @Prop({
    type: Buffer,
    transform: (img) => `data:image/png;base64,${img.toString('base64')}`,
  })
  @ApiPropertyOptional({ type: 'string', format: 'byte' })
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
