import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Label } from 'src/labels/schemas/label.schema';
import { Answer } from '../schema';
import { IQuestion } from '../schema/question.schema';

export class CreateQuestionDto implements IQuestion {
  @ApiProperty()
  definition: string;
  @ApiProperty({ type: () => Answer, isArray: true })
  answers: Answer[];
  @ApiProperty({ type: () => Label, isArray: true })
  labels: Label[];
  @ApiPropertyOptional()
  notes?: string;
  @ApiPropertyOptional({ type: 'string', format: 'byte' })
  image?: Buffer;
}
