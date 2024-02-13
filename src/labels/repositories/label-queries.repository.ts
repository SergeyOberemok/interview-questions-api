import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Label } from '../schemas/label.schema';

@Injectable()
export class LabelQueriesRepository {
  constructor(@InjectModel(Label.name) private labelModel: Model<Label>) {}

  async findAll(filter: FilterQuery<Label> = {}): Promise<Label[]> {
    return this.labelModel.find(filter).exec();
  }
}
