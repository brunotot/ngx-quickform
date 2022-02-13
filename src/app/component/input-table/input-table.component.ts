import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ITableMetadata } from 'src/app/decorator/input/impl/TableDecorator';
import VIEW_PROVIDERS, { buildProviders } from 'src/app/model/Provider';
import Quickform, { IInputProperty } from 'src/app/model/Quickform';
import ReactiveInput from 'src/app/model/ReactiveInput';
import { v4 as uuidv4 } from 'uuid';

const MIN_REQUIRED_COLUMN_WIDTH = 150;

const debounce = (func: Function, timeout = 300) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss'],
  providers: buildProviders(InputTableComponent),
  viewProviders: VIEW_PROVIDERS
})
export class InputTableComponent extends ReactiveInput implements OnInit {
  override get metadata(): ITableMetadata {
    return this._metadata as ITableMetadata;
  }

  override get control(): FormArray {
    return super.control as FormArray;
  }

  String = String;
  uuid: string;
  tableInputProperties!: IInputProperty[];
  @ViewChild("tableRef") tableRef!: ElementRef;
  tableSelector: string;

  setTableColumnsDisplayStyle(show: boolean, column: number) {
    var rowsCount = this.tableFormGroups.length;
    for (let row = 2; row <= rowsCount + 1; row++) {
      let elem: any = document.querySelector(`${this.tableSelector} .qf-table-row:nth-of-type(${row}) .qf-table-column:nth-of-type(${column})`);
      const isExpanded = this.isExpanded(row - 2);
      elem.style.display = show || isExpanded ? '' : 'none';
    }

    /*var rows = document.querySelectorAll(`${this.tableSelector} tbody tr`);
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      let selector = `${this.tableSelector} tbody tr:nth-of-type(${rowIndex + 1}) td:nth-child(${index})`;
      var elems = document.querySelectorAll(selector);
      [].forEach.call(elems, (elem: any) => {
        const spanBadge = document.querySelector(`${this.tableSelector} span[data-expand-btn-index='${rowIndex}'] > span`);
        const notExpanded = !!spanBadge?.classList.contains('fa-plus');
        if (notExpanded) {
          elem.style.display = show ? '' : 'none';
        }
      });
    }*/
  }

  setExpandTableRow(expand: boolean, index: number) {
    var row: any = document.querySelector(`${this.tableSelector} .qf-table-row:nth-of-type(${index + 2})`);
    row.style.flexDirection = expand ? 'column' : '';
    this.handleDebouncedResize()
  }

  constructor() {
    super();
    this.uuid = uuidv4();
    this.tableSelector = `.qf-table[data-id='${this.uuid}']`;
  }

  shownItemsCount!: number;

  debounceResize = debounce(() => {
    this.handleDebouncedResize()
  }, 1000)

  @HostListener('window:resize')
  onResize() {
    //this.debounceResize();
    this.handleDebouncedResize()
  }

  handleDebouncedResize() {
    let tableWidth = this.tableRef.nativeElement.offsetWidth;
    let inputsCount = this.tableInputProperties.length;
    let availableInputsCount = Math.floor(tableWidth / MIN_REQUIRED_COLUMN_WIDTH);
    if (availableInputsCount > inputsCount) availableInputsCount = inputsCount;
    else if (availableInputsCount < 1) availableInputsCount = 1;
    this.shownItemsCount = availableInputsCount;
    for (let column = 1; column <= inputsCount; column++) {
      this.setTableColumnsDisplayStyle(column <= availableInputsCount, column);
    }
  }

  removeItem(index: number) {
    this.control.removeAt(index)
  }

  isExpanded(index: number) {
    const spanBadge = document.querySelector(`${this.tableSelector} span[data-expand-btn-index='${index}'] > span`);
    return !spanBadge?.classList.contains('fa-plus');
  }

  onRowExpandClick(index: number) {
    const spanBadge = document.querySelector(`${this.tableSelector} span[data-expand-btn-index='${index}'] > span`);
    const expand = !!spanBadge?.classList.contains('fa-plus');

    if (expand) {
      spanBadge?.classList.remove('fa-plus')
      spanBadge?.classList.add('fa-minus-red')

    } else {
      spanBadge?.classList.remove('fa-minus-red')
      spanBadge?.classList.add('fa-plus')
    }

    this.setExpandTableRow(expand, index);
  }

  ngOnInit(): void {
    let model = this.metadata.model;
    let quickform = new Quickform(model);
    this.tableInputProperties = quickform.inputProperties;
    setTimeout(() => {
      this.handleDebouncedResize();
      this.handleDebouncedResize();
    })
  }

  innerErrors(form: FormGroup, propertyName: string): string {
    if (!this.isSubmitClicked) return ''
    let errorsAny: any = form.get(propertyName)?.errors || {};
    return Object.values(errorsAny).join("\n");
  }


  onAdd() {
    let formGroup = new Quickform(this.metadata.model, true).form
    this.control.push(formGroup);
    setTimeout(() => this.handleDebouncedResize());
  }

  getColumnWidth(shownItemsCount: number, index: number) {
    if (this.isExpanded(index)) {
      return '100%';
    }
    let deleteBtnColumn: any = document.querySelector(`${this.tableSelector} .qf-table-row:nth-of-type(${index + 2}) .flex-row-action:last-child`)
    let deleteBtnColumnWidth: number = deleteBtnColumn.offsetWidth;
    let baseWidth = `(100% / ${shownItemsCount + 1})`;
    let appender = `((${baseWidth} - ${deleteBtnColumnWidth}px) / ${shownItemsCount})`;
    return `calc(${baseWidth} + ${appender})`
  }

  get tableFormGroups(): FormGroup[] {
    return this.control.controls as FormGroup[];
  }
}
