import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { isEmail, isString } from 'class-validator';

export class ParseEmailPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, metadata: ArgumentMetadata) {
    const isValueString = isString(value);
    if (!isValueString)
      throw new BadRequestException('Given value is not string');

    const isValueEmail = isEmail(value);
    if (!isValueEmail)
      throw new BadRequestException('Given value is not email');

    return value;
  }
}
