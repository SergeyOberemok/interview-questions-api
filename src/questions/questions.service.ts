import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import {
  CreateQuestionDto,
  Question,
  QuestionDocument,
  UpdateQuestionDto,
} from './models';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  create(createQuestionDto: CreateQuestionDto): Observable<Question> {
    const question = new this.questionModel(createQuestionDto);

    return from(question.save());
  }

  findAll(): Observable<Question[]> {
    return from(this.questionModel.find().exec());
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
