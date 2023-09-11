import { QueryHandler } from '@nestjs/cqrs';
import { QuestionQueriesRepository } from '../repositories/question-queries.repository';
import { FindAllQuestionsQuery } from './find-all-questions.query';
import { Question } from '../schema/question.schema';

@QueryHandler(FindAllQuestionsQuery)
export class FindAllQuestionsHandler {
  constructor(private questionQueriesRepository: QuestionQueriesRepository) {}

  async execute(query: FindAllQuestionsQuery): Promise<Question[]> {
    return this.questionQueriesRepository.findAll();
  }
}
