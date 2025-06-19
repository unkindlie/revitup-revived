import { Expose, Type } from 'class-transformer';

export function ValidatedArray<T>(propObj: Record<string, new () => T>) {
    const propName = Object.keys(propObj)[0];
    const propType = Object.values(propObj)[0];

    class Cls {
        @Expose()
        @Type(() => propType)
        [propName]: T[];
    }

    return Cls;
}
