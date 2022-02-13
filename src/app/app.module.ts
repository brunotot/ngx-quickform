import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextComponent } from './component/input-text/input-text.component';
import { QuickformComponent } from './component/quickform/quickform.component';
import { InputCheckboxComponent } from './component/input-checkbox/input-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import ReactiveInput from './model/ReactiveInput';
import { InputSelectComponent } from './component/input-select/input-select.component';
import { InputTableComponent } from './component/input-table/input-table.component';
import { SelectOptionAdapterPipe } from './pipe/select-option-adapter.pipe';
import { InputBaseComponent } from './component/input-base/input-base.component';

@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent,
    QuickformComponent,
    InputCheckboxComponent,
    ReactiveInput,
    InputSelectComponent,
    InputTableComponent,
    SelectOptionAdapterPipe,
    InputBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
