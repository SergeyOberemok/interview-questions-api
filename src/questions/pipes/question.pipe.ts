import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { IQuestion } from '../schema/question.schema';

@Injectable()
export class QuestionPipe implements PipeTransform {
  transform(value: IQuestion, metadata: ArgumentMetadata): IQuestion {
    const labels = [...value.labels];

    labels.sort();

    return { ...value, labels };
  }
}
