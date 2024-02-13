import { CommandHandler } from '@nestjs/cqrs';
import { QuestionRepository } from '../repositories/question.repository';
import { Question } from '../schema/question.schema';
import { CreateQuestionCommand } from './create-question.command';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionCommandHandler {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    createQuestionDto,
  }: CreateQuestionCommand): Promise<Question> {
    return this.questionsRepository.create(createQuestionDto);
  }
}
