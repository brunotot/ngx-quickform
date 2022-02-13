import { getValidateDecoratorFn } from "../BaseValidatorDecorator";
import { IValidateMetadata } from "./ValidatorDecorator";

const DEFAULT_REQUIRED_VALIDATION_MESSAGE = 'Entry field is mandatory';

export default function Required(message?: string) {
  let validateMetadata: IValidateMetadata = {
    message: message || DEFAULT_REQUIRED_VALIDATION_MESSAGE,
    isValid: (value: any) => {
      let jsonValue = JSON.parse(JSON.stringify(value));
      return Array.isArray(jsonValue) 
        ? jsonValue.length > 0
        : typeof jsonValue === 'string'
          ? jsonValue.length > 0
          : typeof jsonValue === 'number'
            ? true
            : !!jsonValue
    }
  }
  return getValidateDecoratorFn(validateMetadata);
}