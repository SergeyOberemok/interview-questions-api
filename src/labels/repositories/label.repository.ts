import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLabelDto } from '../dto';
import { Label } from '../schemas/label.schema';

@Injectable()
export class LabelRepository {
  constructor(@InjectModel(Label.name) private labelModel: Model<Label>) {}

  async create(label: CreateLabelDto): Promise<Label> {
    return new this.labelModel(label).save();
  }

  async createMany(labels: CreateLabelDto[]): Promise<Label[]> {
    return this.labelModel.insertMany(labels);
  }
}
