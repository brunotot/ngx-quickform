import { getValidateDecoratorFn } from "../BaseValidatorDecorator";
import { IValidateMetadata } from "./ValidatorDecorator";

function buildDefaultMaxLengthValidationMessage(maxLength: number): string {
  return `Entry can contain up to ${maxLength} characters`;
}

export interface IMaxLengthValidateMetadata {
  message?: string,
  maxLength: number
}

export default function MaxLength(maxLengthValidateMetadata: IMaxLengthValidateMetadata | number) {
  let message: string = typeof maxLengthValidateMetadata === 'number'
    ? buildDefaultMaxLengthValidationMessage(maxLengthValidateMetadata)
    : maxLengthValidateMetadata.message || buildDefaultMaxLengthValidationMessage(maxLengthValidateMetadata.maxLength)

  let maxLength: number = typeof maxLengthValidateMetadata === 'number'
    ? maxLengthValidateMetadata
    : maxLengthValidateMetadata.maxLength;

  let validateMetadata: IValidateMetadata = {
    message: message,
    isValid: (value: string) => String(value).length <= maxLength
  }

  return getValidateDecoratorFn(validateMetadata);
}