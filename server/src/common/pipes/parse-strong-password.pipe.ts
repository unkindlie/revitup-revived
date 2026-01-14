import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { isString, isStrongPassword } from 'class-validator';
import { STRONG_PASSWORD_REQS } from '../../features/auth/constants/auth.constants';

export class ParseStrongPasswordPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const isValueString = isString(value);
    if (!isValueString)
      throw new BadRequestException('Given value is not string');

    const isPasswordStrong = isStrongPassword(value, STRONG_PASSWORD_REQS);
    if (!isPasswordStrong)
      throw new BadRequestException("Password doesn't meet the requirements");

    return value;
  }
}
