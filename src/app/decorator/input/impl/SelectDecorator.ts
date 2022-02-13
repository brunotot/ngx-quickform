import { Observable } from "rxjs";
import { InputType } from "src/app/model/InputType";
import { SelectOption } from "src/app/model/SelectConfig";
import { getInputDecoratorFn } from "../BaseInputDecorator";

export interface ISelectMetadata {
  label: string,
  itemsOrObservable: SelectOption[] | any[] | Observable<any[]> | Observable<SelectOption[]>,
  multiple?: boolean,
  optionAdapter?: (item: any) => SelectOption
}

export default function Select(selectMetadata?: ISelectMetadata) {
  return getInputDecoratorFn(InputType.SELECT, selectMetadata);
}