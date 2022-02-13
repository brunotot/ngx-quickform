import 'reflect-metadata';
import { getOwnPropertyNames } from 'src/app/model/Quickform';
import { getMetadataKeyName, InputType } from "../../model/InputType";

export function getInputDecoratorFn(inputType: InputType, metadata: any) {
  return function(target: any, key: string) {
    let value: any = target[key];

    const getter = () => {
      return value;
    }
    const setter = (next: any) => {
      value = next;
    } 
    
    let tableChildrenPropertyNames: string[] = [];
    if (inputType === InputType.TABLE) {
      tableChildrenPropertyNames = getOwnPropertyNames(metadata.model);
      tableChildrenPropertyNames.forEach(k => {
        let getValue: any = metadata.model[k];
        Reflect.deleteProperty(metadata.model.__proto__, k);
        Object.defineProperty(metadata.model, k, {
          get: () => getValue,
          set: (next: any) => getValue = next,
          enumerable: true,
          configurable: true,
        });
      })
    }

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });

    Reflect.defineMetadata(getMetadataKeyName(inputType), metadata, target, key);
  }
}