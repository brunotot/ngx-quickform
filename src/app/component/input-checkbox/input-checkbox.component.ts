import { Component, Input, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from 'src/app/model/Provider';
import ReactiveInput from 'src/app/model/ReactiveInput';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  providers: buildProviders(InputCheckboxComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputCheckboxComponent extends ReactiveInput implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
