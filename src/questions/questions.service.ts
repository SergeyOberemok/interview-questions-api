import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionCommand } from './commands/create-question.command';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { FindAllQuestionsQuery } from './queries/find-all-questions.query';
import { Question } from './schema/question.schema';

@Injectable()
export class QuestionsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.commandBus.execute(
      new CreateQuestionCommand(createQuestionDto),
    );
  }

  findAll() {
    return this.queryBus.execute(new FindAllQuestionsQuery());
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
