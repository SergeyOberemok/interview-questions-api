import { ApiProperty } from '@nestjs/swagger';
import { ILabel } from '../schemas/label.schema';

export class CreateLabelDto implements ILabel {
  @ApiProperty()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
