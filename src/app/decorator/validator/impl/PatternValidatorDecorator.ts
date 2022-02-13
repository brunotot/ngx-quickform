import { getValidateDecoratorFn } from "../BaseValidatorDecorator";
import { IValidateMetadata } from "./ValidatorDecorator";

const DEFAULT_PATTERN_VALIDATION_MESSAGE = "Entry field doesn't comply to necessary pattern";

export interface IPatternValidateMetadata {
  message?: string,
  regex: string | RegExp
}

export default function Pattern(patternValidateMetadata: IPatternValidateMetadata) {
  let { message, regex } = patternValidateMetadata;
  let validateMetadata: IValidateMetadata = {
    message: message || DEFAULT_PATTERN_VALIDATION_MESSAGE,
    isValid: (value: string) => new RegExp(regex).test(value)
  }
  return getValidateDecoratorFn(validateMetadata);
}