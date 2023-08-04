import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './model/dto/create-label.dto';
import { UpdateLabelDto } from './model/dto/update-label.dto';

@Injectable()
export class LabelsService {
  create(createLabelDto: CreateLabelDto) {
    return 'This action adds a new label';
  }

  findAll() {
    return `This action returns all labels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} label`;
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return `This action updates a #${id} label`;
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }
}
