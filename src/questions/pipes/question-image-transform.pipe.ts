import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { stripBase64 } from 'src/core/utils';

@Injectable()
export class QuestionImageTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.image) {
      return value;
    }

    const image = Buffer.from(stripBase64(value.image), 'base64');

    return { ...value, image };
  }
}
