import { Component, Input, OnInit } from '@angular/core';
import { InputType } from 'src/app/model/InputType';
import VIEW_PROVIDERS, { buildProviders } from 'src/app/model/Provider';
import { IInputProperty } from 'src/app/model/Quickform';
import ReactiveInput from 'src/app/model/ReactiveInput';

@Component({
  selector: 'app-input-base',
  templateUrl: './input-base.component.html',
  styleUrls: ['./input-base.component.scss'],
  providers: buildProviders(InputBaseComponent),
  viewProviders: VIEW_PROVIDERS
})
export class InputBaseComponent extends ReactiveInput implements OnInit {
  InputType = InputType;
  @Input() inputProperty!: IInputProperty;

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
