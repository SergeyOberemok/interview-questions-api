import { Prop, Schema } from '@nestjs/mongoose';
import { QuestionDto } from '../dto/question.dto';

@Schema()
export class Question implements QuestionDto {
  @Prop()
  description: string;
  @Prop()
  answers: string[];

  labelIds: number[];
  tagIds: number[];
}
