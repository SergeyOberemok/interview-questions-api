import { ILabel } from 'src/labels/schemas/label.schema';
import { IAnswer } from '../schema';
import { IQuestion } from '../schema/question.schema';

export class CreateQuestionDto implements IQuestion {
  definition: string;
  answers: IAnswer[];
  labels: ILabel[];
  notes?: string;
  image?: Buffer;
}
