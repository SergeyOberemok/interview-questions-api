import { Test, TestingModule } from '@nestjs/testing';
import { QuestionQueriesRepository } from './question-queries.repository';

describe('QuestionQueriesRepository', () => {
  let service: QuestionQueriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionQueriesRepository],
    }).compile();

    service = module.get<QuestionQueriesRepository>(QuestionQueriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
