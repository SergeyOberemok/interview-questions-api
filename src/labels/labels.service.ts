import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLabelCommand } from './commands';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { FindAllLabelsQuery } from './queries';

@Injectable()
export class LabelsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async create(createLabelDto: CreateLabelDto) {
    return this.commandBus.execute(new CreateLabelCommand(createLabelDto));
  }

  findAll() {
    return this.queryBus.execute(new FindAllLabelsQuery());
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
