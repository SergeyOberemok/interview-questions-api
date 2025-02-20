import { ILabel } from '../schemas/label.schema';

export class CreateLabelDto implements ILabel {
  constructor(public name: string) {}
}
