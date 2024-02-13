import { CreateLabelDto } from '../dto';

export class CreateLabelCommand {
  constructor(public createLabelDto: CreateLabelDto) {}
}
