import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export interface IAnswer {
  title?: string;
  detail: string;
  type?: string;
  note?: string;
}

@Schema({
  toJSON: { versionKey: false },
})
export class Answer implements IAnswer {
  @Prop()
  @ApiPropertyOptional()
  title?: string;
  @Prop({ required: true })
  @ApiProperty()
  detail: string;
  @Prop()
  @ApiPropertyOptional()
  type?: string;
  @Prop()
  @ApiPropertyOptional()
  note?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

export type AnswerDocument = HydratedDocument<Answer>;
