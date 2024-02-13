import { QueryHandler } from '@nestjs/cqrs';
import { LabelQueriesRepository } from '../repositories/label-queries.repository';
import { Label } from '../schemas/label.schema';
import { FindAllLabelsQuery } from './find-all-labels.query';

@QueryHandler(FindAllLabelsQuery)
export class FindAllLabelsQueryHandler {
  constructor(private labelQueriesRepository: LabelQueriesRepository) {}

  async execute(query: FindAllLabelsQuery): Promise<Label[]> {
    return this.labelQueriesRepository.findAll();
  }
}
