import { ILabel } from '../schemas/label.schema';

export class CreateLabelDto implements ILabel {
  constructor(name?: string) {
    this.name = name;
  }

  name: string;
}
