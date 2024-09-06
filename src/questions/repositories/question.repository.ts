import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { makeIdFilter } from 'src/core/mongo';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto';
import { Question } from '../schema/question.schema';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(question: CreateQuestionDto): Promise<Question> {
    return new this.questionModel(question).save();
  }

  async update(id: string, question: UpdateQuestionDto): Promise<Question> {
    return this.questionModel.findOneAndUpdate(makeIdFilter(id), question, {
      new: true,
      returnOriginal: false,
    });
  }

  async remove(id: string): Promise<number> {
    return this.questionModel
      .deleteOne(makeIdFilter(id))
      .then((result) => result.deletedCount);
  }
}
