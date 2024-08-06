import { IAnswer, IQuestion } from '../schema/question.schema';

export class CreateQuestionDto implements IQuestion {
  description: string;
  answers: IAnswer[];
  notes: string;
  labels: string[];
}
