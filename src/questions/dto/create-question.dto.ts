import { IQuestion } from '../entities/question.entity';

export class CreateQuestionDto implements IQuestion {
  description: string;
  answers: string[];
  labels: string[];
}
