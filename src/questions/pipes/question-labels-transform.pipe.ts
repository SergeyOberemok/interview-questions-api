import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateLabelDto } from 'src/labels/dto';
import { IQuestion } from '../schema/question.schema';

@Injectable()
export class QuestionLabelsTransformPipe implements PipeTransform {
  transform(value: IQuestion, metadata: ArgumentMetadata): IQuestion {
    if (!value.labels) {
      return value;
    }
    // if (_.isEmpty(value)) {
    //   throw new BadRequestException('Validation failed');
    // }

    const labels = value.labels.map((label) => new CreateLabelDto(label.name));

    labels.sort();

    return { ...value, labels };
  }
}
