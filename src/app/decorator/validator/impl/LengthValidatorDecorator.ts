import Objects from "src/app/model/Objects";
import { getValidateDecoratorFn } from "../BaseValidatorDecorator";
import { IValidateMetadata } from "./ValidatorDecorator";

function buildDefaultLengthValidationMessage(minLength: number, maxLength: number): string {
  return `Entry must contain between ${minLength} and ${maxLength} characters`;
}

export interface ILengthValidateMetadata {
  message?: string,
  minLength: number,
  maxLength: number
}

export default function Length(lengthValidateMetadata: ILengthValidateMetadata) {
  let { minLength, maxLength } = lengthValidateMetadata;
  Objects.requireValidMinMaxLength(minLength, maxLength);

  let message: string = !!lengthValidateMetadata.message
    ? lengthValidateMetadata.message
    : buildDefaultLengthValidationMessage(minLength, maxLength)

  let validateMetadata: IValidateMetadata = {
    message: message,
    isValid: (value: string) => {
      let valString = String(value);
      let valStringLength = valString.length;
      return valStringLength >= minLength && valStringLength <= maxLength
    }
  }

  return getValidateDecoratorFn(validateMetadata);
}