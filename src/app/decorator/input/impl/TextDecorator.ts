import { TextType } from "src/app/model/TextType";
import { InputType } from "../../../model/InputType";
import { getInputDecoratorFn } from "../BaseInputDecorator";

export interface ITextMetadata {
  label: string,
  type?: TextType
}

export default function Text(textMetadata: ITextMetadata) {
  textMetadata.type = !!textMetadata.type ? textMetadata.type : TextType.TEXT;
  return getInputDecoratorFn(InputType.TEXT, textMetadata);
}