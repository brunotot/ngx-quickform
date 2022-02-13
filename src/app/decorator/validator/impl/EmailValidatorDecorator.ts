import RegexData from "src/app/model/RegexData";
import Pattern, { IPatternValidateMetadata } from "./PatternValidatorDecorator";

const DEFAULT_EMAIL_VALIDATION_MESSAGE = "Entry field must be in a format of an email 'john.doe@mail.com'";

export default function Email(message?: string) {
  let validateMetadata: IPatternValidateMetadata = {
    message: message || DEFAULT_EMAIL_VALIDATION_MESSAGE,
    regex: RegexData['EMAIL']
  }
  return Pattern(validateMetadata);
}