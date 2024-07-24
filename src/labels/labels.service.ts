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
    return this.labelsRepository.create(createLabelDto);
  }

  async createOrExisting(createLabelDtos: CreateLabelDto[]): Promise<Label[]> {
    const existedLabels = await this.labelQueriesRepository.findAll({
      name: { $in: createLabelDtos.map(({ name }: CreateLabelDto) => name) },
    });

    const labelsToCreate = createLabelDtos.filter(
      ({ name }: CreateLabelDto) =>
        !existedLabels.some((label: Label) => label.name === name),
    );

    return labelsToCreate.length > 0
      ? this.labelsRepository.createMany(labelsToCreate)
      : [];
  }

  findAll() {
    return this.labelQueriesRepository.findAll();
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
