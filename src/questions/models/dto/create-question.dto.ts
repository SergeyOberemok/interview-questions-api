import { QuestionDto } from './question.dto';

export class CreateQuestionDto implements QuestionDto {
  description: string;
  answers: string[];
  labelIds: number[];
  tagIds: number[];
}
