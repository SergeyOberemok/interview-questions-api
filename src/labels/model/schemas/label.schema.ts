import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Label as LabelEntity } from '../entities';
import { ILabel } from '../entities/label.interface';

@Schema()
export class Label extends LabelEntity implements ILabel {
  @Prop({ required: true })
  name: string;
}

export type LabelDocument = HydratedDocument<Label>;
export const LabelSchema = SchemaFactory.createForClass(Label);
