import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from '../dto';
import { Question } from '../schema/question.schema';

@Injectable()
export class QuestionCommandsRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(question: CreateQuestionDto): Promise<Question> {
    return new this.questionModel(question).save();
  }
}
