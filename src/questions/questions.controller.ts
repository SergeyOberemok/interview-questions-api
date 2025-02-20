import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import * as _ from 'lodash';
import { CleanPipe } from 'src/core/pipes';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionImageTransformPipe } from './pipes/question-image-transform.pipe';
import { QuestionLabelsTransformPipe } from './pipes/question-labels-transform.pipe';
import { QuestionsService } from './questions.service';
import { Question } from './schema/question.schema';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @Body(new QuestionLabelsTransformPipe(), new QuestionImageTransformPipe())
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Post('many')
  createMany(
    @Body(new ParseArrayPipe({ items: CreateQuestionDto }))
    createQuestionDtos: CreateQuestionDto[],
  ): Promise<Question[]> {
    const result = createQuestionDtos
      .filter(_.isEmpty)
      .map((createQuestionDto: CreateQuestionDto) =>
        this.questionsService.create(createQuestionDto),
      );

    return Promise.all(result);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('size', ParseIntPipe) size: number = 10,
    @Query('search', CleanPipe) search: string = '',
  ): Promise<{ questions: Question[]; total: number }> {
    return this.questionsService.findAll(page, size, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new QuestionLabelsTransformPipe(), new QuestionImageTransformPipe())
    updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
