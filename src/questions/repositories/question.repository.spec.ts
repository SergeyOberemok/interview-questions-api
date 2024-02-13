import { Test, TestingModule } from '@nestjs/testing';
import { QuestionRepository } from './question.repository';

describe('QuestionRepository', () => {
  let service: QuestionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionRepository],
    }).compile();

    service = module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
