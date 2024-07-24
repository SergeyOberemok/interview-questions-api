import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelsModule } from 'src/labels/labels.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionQueriesRepository, QuestionRepository } from './repositories';
import { Question, QuestionSchema } from './schema/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    LabelsModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository, QuestionQueriesRepository],
})
export class QuestionsModule {}
