import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { LabelQueriesRepository } from './repositories/label-queries.repository';
import { LabelRepository } from './repositories/label.repository';
import { Label } from './schemas/label.schema';

@Injectable()
export class LabelsService {
  constructor(
    private labelsRepository: LabelRepository,
    private labelQueriesRepository: LabelQueriesRepository,
  ) {}

  async create(createLabelDto: CreateLabelDto) {
    return this.labelsRepository.createIfNotExist(createLabelDto);
  }

  findAll(search: string) {
    return this.labelQueriesRepository.findAll(search);
  }

  async findAllOrCreate(createLabelDtos: CreateLabelDto[]): Promise<Label[]> {
    return Promise.all(
      createLabelDtos.map((createLabelDto) =>
        this.labelsRepository.createIfNotExist(createLabelDto),
      ),
    );
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
