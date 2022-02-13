import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({ template: '' })
export default class ReactiveInput implements ControlValueAccessor {
  @Input('metadata') _metadata: any = {};
  @Input('form') _form!: FormGroup;
  @Input('propertyName') _propertyName!: string;
  @Input('isSubmitClicked') _isSubmitClicked!: boolean;

  get metadata() {
    return this._metadata;
  }

  get control(): AbstractControl {
    return this.form.controls[this.propertyName];
  }

  get form() {
    return this._form;
  }

  get propertyName() {
    return this._propertyName;
  }

  get isSubmitClicked() {
    return this._isSubmitClicked;
  }

  get validationClass(): string {
    return this.isSubmitClicked
      ? this.isValid()
        ? 'valid'
        : 'invalid'
      : '';
  }

  isValid(): boolean {
    return !this.form?.get(this.propertyName)?.errors;
  }

  constructor() {
  }

  writeValue(value: any) {
    let config = {} as any;
    config[this.propertyName] = value;
    this.form.patchValue(config);
  }

  registerOnChange() { }
  registerOnTouched() { }
}