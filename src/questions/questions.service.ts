import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from 'src/labels/dto';
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
    this.labelsService.createOrExisting(
      createQuestionDto.labels.map((label) => new CreateLabelDto(label)),
    );

    return this.questionsRepository.create(createQuestionDto);
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
