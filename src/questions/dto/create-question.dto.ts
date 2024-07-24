import { IQuestion } from '../schema/question.schema';

export class CreateQuestionDto implements IQuestion {
  description: string;
  answers: string[];
  labels: string[];
}
