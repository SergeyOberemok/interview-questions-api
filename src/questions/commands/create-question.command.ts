import { CreateQuestionDto } from '../dto';

export class CreateQuestionCommand {
  constructor(public createQuestionDto: CreateQuestionDto) {}
}
