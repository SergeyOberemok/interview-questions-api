import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ILabel, Label as LabelEntity } from '../entities/label.entity';

@Schema()
export class Label extends LabelEntity implements ILabel {
  @Prop({ required: true })
  name: string;
}

export type LabelDocument = HydratedDocument<Label>;
export const LabelSchema = SchemaFactory.createForClass(Label);
