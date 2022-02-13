import { InputType } from "src/app/model/InputType";
import { getInputDecoratorFn } from "../BaseInputDecorator";

export interface ICheckboxMetadata {
  label: string
}

export default function Checkbox(checkboxMetadata?: ICheckboxMetadata) {
  return getInputDecoratorFn(InputType.CHECKBOX, checkboxMetadata);
}