import { CommandHandler } from '@nestjs/cqrs';
import { CreateLabelDto } from '../dto';
import { LabelQueriesRepository } from '../repositories/label-queries.repository';
import { LabelRepository } from '../repositories/label.repository';
import { Label } from '../schemas/label.schema';
import { CreateLabelIfNotExistCommand } from './create-labels-if-not-exist.command';

@CommandHandler(CreateLabelIfNotExistCommand)
export class CreateLabelIfNotExistCommandHandler {
  constructor(
    private labelsRepository: LabelRepository,
    private labelQueriesRepository: LabelQueriesRepository,
  ) {}

  async execute({
    createLabelDtos,
  }: CreateLabelIfNotExistCommand): Promise<Label[]> {
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
}
