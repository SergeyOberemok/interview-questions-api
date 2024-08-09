import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionsService } from './questions.service';
import { Question } from './schema/question.schema';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    if (!Object.values(createQuestionDto).length) {
      return Promise.reject('Object is empty');
    }

    return this.questionsService.create(createQuestionDto);
  }

  @Post('many')
  createMany(
    @Body() createQuestionDtos: CreateQuestionDto[],
  ): Promise<Question[]> {
    const result = createQuestionDtos
      .filter(
        (createQuestionDto: CreateQuestionDto) =>
          Object.values(createQuestionDto).length > 0,
      )
      .map((createQuestionDto: CreateQuestionDto) =>
        this.questionsService.create(createQuestionDto),
      );

    return Promise.all(result);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('size', ParseIntPipe) size: number = 10,
    @Query('search') search: string = '',
  ): Promise<{ questions: Question[]; total: number }> {
    return this.questionsService.findAll(page, size, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
