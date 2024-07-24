import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface ILabel {
  name: string;
}

@Schema()
export class Label implements ILabel {
  @Prop({ required: true })
  name: string;
}

export type LabelDocument = HydratedDocument<Label>;
export const LabelSchema = SchemaFactory.createForClass(Label);
