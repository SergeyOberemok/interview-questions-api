import { Test, TestingModule } from '@nestjs/testing';
import { LabelRepository } from './label.repository';

describe('LabelRepositoryService', () => {
  let service: LabelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabelRepository],
    }).compile();

    service = module.get<LabelRepository>(LabelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
