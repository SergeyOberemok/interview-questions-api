import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../schema/question.schema';

@Injectable()
export class QuestionQueriesRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async findAll(page: number, size: number): Promise<Question[]> {
    return this.questionModel
      .find()
      .limit(size)
      .skip((page - 1) * size)
      .exec();
  }

  async countAll(): Promise<number> {
    return this.questionModel.countDocuments();
  }
}
