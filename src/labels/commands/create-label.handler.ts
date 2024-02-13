import { CommandHandler } from '@nestjs/cqrs';
import { LabelRepository } from '../repositories/label.repository';
import { Label } from '../schemas/label.schema';
import { CreateLabelCommand } from './create-label.command';

@CommandHandler(CreateLabelCommand)
export class CreateLabelCommandHandler {
  constructor(private labelsRepository: LabelRepository) {}

  async execute({ createLabelDto }: CreateLabelCommand): Promise<Label> {
    return this.labelsRepository.create(createLabelDto);
  }
}
