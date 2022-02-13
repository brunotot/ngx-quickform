import { FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { InputType, METADATA_KEY_PREFIX } from "./InputType";
import "reflect-metadata";
import { METADATA_VALIDATION_KEY_PREFIX } from "../decorator/validator/BaseValidatorDecorator";
import Objects from "./Objects";

export function getOwnPropertyNames(object: any): string[] {
  let propertyNames: string[] = Object.getOwnPropertyNames(object);
  if (!propertyNames.length) {
    propertyNames = Object.getOwnPropertyNames(object?.__proto__);
  }
  return propertyNames.filter(propertyName => propertyName !== 'constructor');
}

export interface IFormControls { 
  [key: string]: FormControl | FormArray | FormGroup
}

export interface IInputProperty {
  inputType: InputType,
  propertyName: string,
  metadata: any,
  validatorFns: ValidatorFn[]
}

export default class Quickform {
  model: any;
  form!: FormGroup;
  inputProperties!: IInputProperty[];
  propertyNames!: string[];

  constructor(model: any, empty?: boolean) {
    this.model = typeof model === 'object' ? model : {};
    if (typeof empty === 'boolean' && empty) {
      let keys = getOwnPropertyNames(this.model);
      for (let key of keys) {
        this.model.__proto__[key] = undefined;
      }
    }
    this.init();
  }
  
  errors(propertyName: string): string[] {
    let errorsAny: any = this.form.get(propertyName)?.errors || {};
    return Object.values(errorsAny);
  }

  private init() {
    this.initPropertyNames();
    this.initInputProperties();
    this.initForm();
  }

  private initInputProperties() {
    let inputProperties: IInputProperty[] = [];
    for (var propertyName of this.propertyNames) {
      const metadataKey = this.getMetadataKey(propertyName);
      if (metadataKey) {
        const inputType: InputType = this.getInputType(metadataKey);
        const metadataValue: any = this.getMetadataValue(metadataKey, propertyName);
        inputProperties.push({
          inputType: inputType,
          propertyName: propertyName,
          metadata: metadataValue,
          validatorFns: this.getValidatorFns(propertyName)
        })
      }
    }
    this.inputProperties = inputProperties;
  }

  private initPropertyNames() {
    this.propertyNames = getOwnPropertyNames(this.model);
  }

  private initForm() {
    let controls: IFormControls = this.getControls();
    this.form = new FormGroup(controls)
    this.form.valueChanges.subscribe(() => {
      let keys = Object.keys(this.form.controls)
      for (let key of keys) {
        this.form.controls[key].updateValueAndValidity({
          emitEvent: false
        })
      }
    });
  }

  private getControls(): IFormControls {
    let controls: IFormControls = {};
    for (let inputProperty of this.inputProperties) {
      let propertyName = inputProperty.propertyName;
      let currentValue = this.model[propertyName];
      if (inputProperty.inputType === InputType.TABLE) {
        let currentValuesArray = Array.isArray(currentValue)
          ? currentValue
          : [];
        let currentFormGroups: FormGroup[] = currentValuesArray.map((currentModel: any) => {
          let currentModelQuickform = new Quickform(currentModel);
          return currentModelQuickform.form;
        });
        controls[propertyName] = new FormArray(currentFormGroups, inputProperty.validatorFns);
      } else {
        controls[propertyName] = new FormControl(currentValue, inputProperty.validatorFns)
      }
    }
    return controls;
  }

  private getMetadataKey(propertyName: string): string {
    const metadataKeys: string[] = Reflect.getMetadataKeys(this.model, propertyName);
    const inputMetadataKeys: string[] = metadataKeys.filter((key: string) => key.startsWith(METADATA_KEY_PREFIX));
    return inputMetadataKeys[0];
  }

  private getValidatorFns(propertyName: string): ValidatorFn[] {
    let validatorFns: ValidatorFn[] = [];
    Reflect.getMetadataKeys(this.model, propertyName)
      .filter((key: string) => key.startsWith(METADATA_VALIDATION_KEY_PREFIX))
      .forEach((key: string) => {
        let validatorFn: ValidatorFn = this.getMetadataValue(key, propertyName);
        validatorFns.push(validatorFn);
      });
    return validatorFns;
  }

  private getInputType(metadataKey: string): InputType {
    Objects.requireMetadataKey(metadataKey);
    const inputMetadataKeySanitized: string = metadataKey.substring(METADATA_KEY_PREFIX.length);
    return Number(inputMetadataKeySanitized) as InputType;
  }

  private getMetadataValue(metadataKey: string, propertyName: string): any {
    return Reflect.getMetadata(metadataKey, this.model, propertyName);
  }
}