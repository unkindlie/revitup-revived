import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

type SetCookie = {
    key: string;
    value: unknown;
    res: Response;
    options: Omit<CookieOptions, 'httpOnly' | 'secure'>;
};

@Injectable()
export class CookieHelper {
    setCookie({ key, res, value, options }: SetCookie): void {
        res.cookie(key, value, {
            httpOnly: true,
            ...options,
        });
    }
    clearCookie(key: string, res: Response): void {
        res.clearCookie(key);
    }
}
