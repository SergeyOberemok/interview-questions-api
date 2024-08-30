import { Injectable, PipeTransform } from '@nestjs/common';
import { removeUnnecessarySigns } from '../utils';

@Injectable()
export class CleanPipe implements PipeTransform {
  transform(value: string) {
    return removeUnnecessarySigns(value);
  }
}
