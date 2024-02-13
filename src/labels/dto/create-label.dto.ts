import { ILabel } from '../entities/label.entity';

export class CreateLabelDto implements ILabel {
  constructor(name?: string) {
    this.name = name;
  }

  name: string;
}
