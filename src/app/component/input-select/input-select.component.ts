import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectMetadata } from 'src/app/decorator/input/impl/SelectDecorator';
import VIEW_PROVIDERS, { buildProviders } from 'src/app/model/Provider';
import ReactiveInput from 'src/app/model/ReactiveInput';
import { SelectOption } from 'src/app/model/SelectConfig';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: buildProviders(InputSelectComponent),
  viewProviders: VIEW_PROVIDERS
})
export class InputSelectComponent extends ReactiveInput implements OnInit {
  override get metadata(): ISelectMetadata {
    return this._metadata as ISelectMetadata;
  }
  
  isMultiple!: boolean;
  isAjax!: boolean;
  optionAdapter!: (item: any) => SelectOption;
  items: SelectOption[] = (null as unknown) as SelectOption[];
  items$: Observable<SelectOption[]> = (null as unknown) as Observable<SelectOption[]>;
  hasValue: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.isMultiple = !!this.metadata.multiple;
    this.isAjax = !Array.isArray(this.metadata.itemsOrObservable);
    this.optionAdapter = typeof this.metadata.optionAdapter === 'function'
      ? this.metadata.optionAdapter
      : (item: any) => ({
        id: String(item['id']),
        text: String(item['text'])
      });
    if (this.isAjax) {
      this.items$ = this.metadata.itemsOrObservable as Observable<SelectOption[]>;
    } else {
      let items = this.metadata.itemsOrObservable as any[];
      this.items = items.map(item => this.optionAdapter(item));
    }
    this.onChange(this.control.value)
  }

  onChange(newValue: any) {
    this.hasValue = Array.isArray(newValue)
      ? newValue.length > 0
      : !!newValue
  }
}
