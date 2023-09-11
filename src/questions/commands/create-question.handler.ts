import { CommandHandler } from '@nestjs/cqrs';
import { QuestionCommandsRepository } from '../repositories/question-commands.repository';
import { Question } from '../schema/question.schema';
import { CreateQuestionCommand } from './create-question.command';

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionHandler {
  constructor(private questionCommandsRepository: QuestionCommandsRepository) {}

  async execute(command: CreateQuestionCommand): Promise<Question> {
    const { createQuestionDto } = command;

    return this.questionCommandsRepository.create(createQuestionDto);
  }
}
