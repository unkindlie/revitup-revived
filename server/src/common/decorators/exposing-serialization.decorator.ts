import {
  ClassSerializerInterceptor,
  SerializeOptions,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';

export function ExposingSerialization<T>(type: new () => T) {
  return applyDecorators(
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({
      type,
      excludeExtraneousValues: true,
    }),
  );
}
