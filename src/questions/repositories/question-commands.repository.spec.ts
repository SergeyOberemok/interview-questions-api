import { Test, TestingModule } from '@nestjs/testing';
import { QuestionCommandsRepository } from './question-commands.repository';

describe('QuestionCommandsRepository', () => {
  let service: QuestionCommandsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionCommandsRepository],
    }).compile();

    service = module.get<QuestionCommandsRepository>(
      QuestionCommandsRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
