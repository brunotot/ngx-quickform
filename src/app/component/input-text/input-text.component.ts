import { Component, Input, OnInit } from '@angular/core';
import VIEW_PROVIDERS, { buildProviders } from 'src/app/model/Provider';
import ReactiveInput from 'src/app/model/ReactiveInput';
import { TextType } from 'src/app/model/TextType';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: buildProviders(InputTextComponent),
  viewProviders: VIEW_PROVIDERS,
})
export class InputTextComponent extends ReactiveInput implements OnInit {
  TextType = TextType;
  passwordShown: boolean = false;

  constructor() {
    super();
  }

  onPasswordShowClick() {
    this.passwordShown = !this.passwordShown;
  }

  ngOnInit(): void {
  }

}
