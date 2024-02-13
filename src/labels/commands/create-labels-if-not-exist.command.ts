import { CreateLabelDto } from '../dto';

export class CreateLabelIfNotExistCommand {
  constructor(public createLabelDtos: CreateLabelDto[]) {}
}
