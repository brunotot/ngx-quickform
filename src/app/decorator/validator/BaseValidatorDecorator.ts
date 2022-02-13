import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import 'reflect-metadata';
import { IValidateMetadata } from './impl/ValidatorDecorator';
export const METADATA_VALIDATION_KEY_PREFIX = 'validation:quickform:';
import { v4 as uuidv4 } from 'uuid';

export interface IValidateConfig {
  message: string,
  validatorFn: ValidatorFn
}

export function getFormObject(target: any, formParent: FormGroup | null) {
  if (!formParent) {
    return target;
  }
  let formControls = formParent.controls;
  for (let propertyName of Object.keys(formControls)) {
    target[propertyName] = formControls[propertyName].value;
  }
  return target;
}

function getValidatorFn(target: any, message: string, isValid: (value: any, target?: any) => boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let controlValue: any = control.value;
    let config: any = {}
    let key = uuidv4()
    config[key] = message;
    return isValid(controlValue, getFormObject(target, control.parent as FormGroup)) ? null : config;
  };
}

export function getValidateDecoratorFn(validateMetadata: IValidateMetadata) {
  const { message, isValid } = validateMetadata;
  return function(target: any, key: string | symbol) {
    let validateFn = getValidatorFn(target, message, isValid);
    const metadataKey = `${METADATA_VALIDATION_KEY_PREFIX}${uuidv4()}`;
    Reflect.defineMetadata(metadataKey, validateFn, target, key);
  }
}