import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter } from 'mongoose';
import { makeEqualFilter } from 'src/core/mongo';
import { makeLikeRegExp } from 'src/core/utils';
import { Label } from '../schemas/label.schema';

@Injectable()
export class LabelQueriesRepository {
  constructor(@InjectModel(Label.name) private labelModel: Model<Label>) {}

  async findAll(search: string): Promise<Label[]> {
    const filter: QueryFilter<{ name: string }> = search
      ? makeEqualFilter('name', makeLikeRegExp(search))
      : {};

    return this.labelModel.find(filter).exec();
  }
}
