import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { makeEqualFilter, makeInFilter, makeOrFilter } from 'src/core/mongo';
import { makeLikeRegExp, makeRegExps } from 'src/core/utils';
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

    return makeOrFilter([
      makeEqualFilter('description', makeLikeRegExp(search)),
      makeInFilter('labels.name', makeRegExps(search.split(' '))),
    ]);
  }

  async find(id: string): Promise<Question> {
    return this.questionModel.findById(id);
  }
}
