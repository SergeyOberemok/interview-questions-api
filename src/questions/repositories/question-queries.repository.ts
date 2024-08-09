import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../schema/question.schema';

@Injectable()
export class QuestionQueriesRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async findAll(
    page: number,
    size: number,
    search: string,
  ): Promise<Question[]> {
    return this.questionModel
      .find(this.prepareFilter(search))
      .limit(size)
      .skip((page - 1) * size)
      .exec();
  }

  async countAll(search: string): Promise<number> {
    return this.questionModel.countDocuments(this.prepareFilter(search));
  }

  private prepareFilter(search: string) {
    if (!search) {
      return {};
    }

    const regex = new RegExp(`.*${search}.*`, 'i');

    return {
      $or: [{ description: regex }, { notes: regex }, { labels: regex }],
    };
  }
}
