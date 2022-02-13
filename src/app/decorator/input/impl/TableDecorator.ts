import Objects from "src/app/model/Objects";
import { InputType } from "../../../model/InputType";
import { getInputDecoratorFn } from "../BaseInputDecorator";

export interface ITableMetadata {
  label: string,
  model: any
}

export default function Table(tableMetadata: ITableMetadata) {
  Objects.requireModel(tableMetadata.model);
  return getInputDecoratorFn(InputType.TABLE, tableMetadata);
}