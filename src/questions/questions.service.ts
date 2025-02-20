import { Injectable } from '@nestjs/common';
import { LabelsService } from 'src/labels/labels.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionQueriesRepository } from './repositories/question-queries.repository';
import { QuestionRepository } from './repositories/question.repository';
import { Question } from './schema/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    private labelsService: LabelsService,
    private questionsRepository: QuestionRepository,
    private questionQueriesRepository: QuestionQueriesRepository,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const labels = await this.labelsService.findAllOrCreate(
      createQuestionDto.labels,
    );

    return this.questionsRepository.create({
      ...createQuestionDto,
      labels,
    });
  }

  findAll(
    page: number,
    size: number,
    search: string,
  ): Promise<{ questions: Question[]; total: number }> {
    return Promise.all([
      this.questionQueriesRepository.findAll(page, size, search),
      this.questionQueriesRepository.countAll(search),
    ]).then(([questions, total]) => ({
      questions,
      total,
    }));
  }

  findOne(id: string): Promise<Question> {
    return this.questionQueriesRepository.find(id);
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.questionsRepository.update(id, updateQuestionDto);
  }

  remove(id: string) {
    return this.questionsRepository.remove(id);
  }
}
