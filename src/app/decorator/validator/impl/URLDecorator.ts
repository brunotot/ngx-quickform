import RegexData from "src/app/model/RegexData";
import Pattern, { IPatternValidateMetadata } from "./PatternValidatorDecorator";

const DEFAULT_URL_VALIDATION_MESSAGE = "Entry field must be in a format of a URL 'https://www.john-doe.com'";

export default function URL(message?: string) {
  let validateMetadata: IPatternValidateMetadata = {
    message: message || DEFAULT_URL_VALIDATION_MESSAGE,
    regex: RegexData['URL']
  }
  return Pattern(validateMetadata);
}