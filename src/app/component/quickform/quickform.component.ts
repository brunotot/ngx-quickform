import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import "reflect-metadata";
import { InputType } from 'src/app/model/InputType';
import Quickform, { IInputProperty } from 'src/app/model/Quickform';

@Component({
  selector: 'app-quickform',
  templateUrl: './quickform.component.html',
  styleUrls: ['./quickform.component.scss']
})
export class QuickformComponent implements OnInit {
  InputType = InputType;
  isSubmitClicked: boolean = false;
  quickform!: Quickform;
  @Input() title: string = '';
  @Input() model: any = {};
  @Output() onSubmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.quickform = new Quickform(this.model);
  }

  get form(): FormGroup {
    return this.quickform.form;
  }

  get inputProperties(): IInputProperty[] {
    return this.quickform.inputProperties;
  }

  get errors() {
    return this.quickform.errors;
  }

  submit() {
    this.isSubmitClicked = true;
    if (this.form.invalid || this.form.errors) {
      return;
    }
    let value = this.form.value;
    this.onSubmit.next(value);
  }
}
