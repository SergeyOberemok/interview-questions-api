import { IQuestion } from '../schema/question.schema';
import { IAnswer } from '../shared';

export class CreateQuestionDto implements IQuestion {
  description: string;
  answers: IAnswer[];
  notes: string;
  labels: string[];
}
