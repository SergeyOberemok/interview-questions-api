import { QueryHandler } from '@nestjs/cqrs';
import { QuestionQueriesRepository } from '../repositories/question-queries.repository';
import { Question } from '../schema/question.schema';
import { FindAllQuestionsQuery } from './find-all-questions.query';

@QueryHandler(FindAllQuestionsQuery)
export class FindAllQuestionsQueryHandler {
  constructor(private questionQueriesRepository: QuestionQueriesRepository) {}

  async execute(query: FindAllQuestionsQuery): Promise<Question[]> {
    return this.questionQueriesRepository.findAll();
  }
}
