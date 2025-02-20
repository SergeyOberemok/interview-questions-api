import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface ILabel {
  name: string;
}

@Schema({
  toJSON: { versionKey: false },
})
export class Label implements ILabel {
  @Prop({ required: true })
  name: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);

export type LabelDocument = HydratedDocument<Label>;
