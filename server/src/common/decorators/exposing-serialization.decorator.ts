import {
    applyDecorators,
    ClassSerializerInterceptor,
    SerializeOptions,
    UseInterceptors,
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
