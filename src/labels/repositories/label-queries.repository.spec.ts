import { Test, TestingModule } from '@nestjs/testing';
import { LabelQueriesRepository } from './label-queries.repository';

describe('LabelQueriesRepository', () => {
  let service: LabelQueriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelQueriesRepository],
    }).compile();

    service = module.get<LabelQueriesRepository>(LabelQueriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
