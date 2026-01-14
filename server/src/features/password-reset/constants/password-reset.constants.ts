import { RequestInaccessibilityReason } from '../enums/request-not-available-reason.enum';

export const PASSWORD_RESET_NOT_COMPLETE_MAX_AMOUNT = 3;

export const PasswordResetInaccessibilityExplanation: Record<
  RequestInaccessibilityReason,
  string
> = {
  [RequestInaccessibilityReason.DOESNT_EXIST]:
    'This reset request does not exist',
  [RequestInaccessibilityReason.ALREADY_USED]:
    'This reset request was already used, please create another',
  // [RequestInaccessibilityReason.DOESNT_BELONG_TO_USER]:
  //   'This reset request does not belong to you',
};
