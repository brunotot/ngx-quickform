import { getValidateDecoratorFn } from "../BaseValidatorDecorator";
import { IValidateMetadata } from "./ValidatorDecorator";

function buildDefaultMinLengthValidationMessage(minLength: number): string {
  return `Entry must contain at least ${minLength} characters`;
}

export interface IMinLengthValidateMetadata {
  message?: string,
  minLength: number
}

export default function MinLength(minLengthValidateMetadata: IMinLengthValidateMetadata | number) {
  let message: string = typeof minLengthValidateMetadata === 'number'
    ? buildDefaultMinLengthValidationMessage(minLengthValidateMetadata)
    : minLengthValidateMetadata.message || buildDefaultMinLengthValidationMessage(minLengthValidateMetadata.minLength)

  let minLength: number = typeof minLengthValidateMetadata === 'number'
    ? minLengthValidateMetadata
    : minLengthValidateMetadata.minLength;

  let validateMetadata: IValidateMetadata = {
    message: message,
    isValid: (value: string) => String(value).length >= minLength
  }

  return getValidateDecoratorFn(validateMetadata);
}