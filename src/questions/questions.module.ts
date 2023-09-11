import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { questionCommandHandlers } from './commands';
import { questionQueryHandlers } from './queries';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { questionRepositories } from './repositories';
import { Question, QuestionSchema } from './schema/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    CqrsModule,
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    ...questionRepositories,
    ...questionCommandHandlers,
    ...questionQueryHandlers,
  ],
})
export class QuestionsModule {}
