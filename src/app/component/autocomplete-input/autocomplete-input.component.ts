import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, Subject, debounceTime, map, startWith } from 'rxjs';

interface Menu {
  value: any;
  label: string;
}

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  @Input() disabled = false;
  @Input() disabledInput = false;
  @Input() placeholder = 'autocompleteInput';
  @Input() maxlength: number = 50;
  @Input() showAddBtn = false;
  @Input() loading = false;
  _menuItems!: Menu[];
  @Input()
  get menuItems() {
    return this._menuItems;
  }
  set menuItems(val) {
    this._menuItems = val;
    if (this.model) {
      let mapItem = this.menuItems.find((x) => x.label?.toLowerCase().trim() == this.model?.trim()?.toLowerCase());
      if (mapItem) {
        this.value = mapItem.value;
      } else {
        this.model = this.value = '';
      }
    }
    this.myControl.setValue(this.model ?? '');
  }

  modelValue: any = { name: '', value: '' };
  @Output() objectChange = new EventEmitter();

  //Only for binding model
  @Output() modelChange = new EventEmitter();
  @Input()
  get model() {
    return this.modelValue?.name?.trim() ?? '';
  }
  set model(val) {
    this.modelValue.name = this.inputText = val?.trim();
    this.modelChange.emit(this.modelValue.name);
    this.inputChangeSubject.next(this.modelValue.name);
  }

  @Output() valueChange = new EventEmitter();
  @Input()
  get value() {
    return this.modelValue.value;
  }
  set value(val) {
    this.modelValue.value = val;
    this.valueChange.emit(this.modelValue.value);
  }

  @Output() inputChange = new EventEmitter<any>();

  myControl = new FormControl<string | any>('');
  filteredOptions!: Observable<any[]>;
  @ViewChild('autocompleteInput') autocompleteInput: any;
  @ViewChild('autocomplete') autocomplete!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value.label;
        return name ? this._filter(name as string) : this.menuItems.slice();
      })
    );
    this.registEventSubject();
    this.inputText = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menuItems'] && !changes['menuItems'].firstChange) this.loading = false;
    if (changes['disabled']) {
      this.disabled ? this.myControl.disable() : this.myControl.enable();
    }
    if (changes['value']) {
      let item = this.menuItems.find((x) => x.value == changes['value'].currentValue);
      if (item) {
        this.value = item?.value ?? '';
        this.model = item?.label ?? '';
      }
    }
    if (changes['model']) {
      this.inputText = changes['model'].currentValue ?? '';
      this.myControl.setValue(this.model ?? '');
    }
  }

  private inputChangeSubject = new Subject<string>();
  private registEventSubject() {
    this.inputChangeSubject.pipe(debounceTime(100)).subscribe((data: any) => {
      if (this.loading) return;
      if (this.autocompleteInput?.nativeElement) this.autocompleteInput.nativeElement.value = this.model;
      this.objectChange.emit(this.modelValue);
    });
  }

  private _filter(item: any): any[] {
    const filterValue = item?.toLowerCase()?.trim();
    return this.menuItems.filter((option) => option.label.toLowerCase().includes(filterValue));
  }

  displayFn(e: any) {
    return e && e.label ? e.label : '';
  }
  onFocus(e: any) {
    if (this.disabledInput) e.target.blur();
  }
  @Output() blur = new EventEmitter<any>();
  onBlur(e: any) {
    if (e.currentTarget.value != this.model) {
      this.inputChangeSubject.next(this.model);
    } else {
      this.blur.emit(e);
    }
  }

  inputText = '';
  addoptionActive = false;
  onInput(e: any) {
    if (e.currentTarget.value == '') {
      this.addoptionAction(false);
      this.myControl.setValue('');
    } else if (this.menuItems.find((x) => x.label.toLowerCase() == e.currentTarget.value?.trim()?.toLowerCase())) {
      this.addoptionAction(false);
    } else {
      this.addoptionAction(true);
    }
    this.inputText = e.currentTarget.value;
    e.currentTarget.value = this.inputText = e.currentTarget.value.replaceAll(/[`\\~!@#$%^\*_\+={}\[\]\|;"<>\?]/gi, '');
    if (e.currentTarget.value?.trim() == '') this.myControl.setValue(e.currentTarget.value);
    this.inputChange.emit(e);
  }

  onModelChange(e: any) {
    if (this.loading) return;
    if (e.currentTarget.value?.trim()) {
      let mapItem = this.menuItems.find(
        (x) => x.label.toLowerCase().trim() == e.currentTarget.value?.trim()?.toLowerCase()
      );
      if (mapItem) {
        this.model = e.currentTarget.value = mapItem.label;
        this.value = mapItem.value;
      } else {
        this.model = e.currentTarget.value;
        this.value = '';
      }
    } else {
      this.model = this.inputText = e.currentTarget.value;
      this.value = '';
    }
  }

  selectedOption(e: any) {
    if (typeof e.option.value === 'string') {
      this.autocompleteInput.nativeElement.value = this.inputText;
    } else {
      let mod = e.option.getLabel() ?? '';
      let val = e.option.value?.value ?? '';
      if (val != this.value || mod != this.model) {
        this.model = mod ?? '';
        this.value = val ?? '';
      }
      if (this.value && this.model) {
        this.addoptionActive = false;
      }
    }
  }

  panelAction(type: number) {
    type == 1 ? this.autocompleteTrigger.openPanel() : this.autocompleteTrigger.closePanel();
  }

  addoptionAction(type: boolean) {
    this.addoptionActive = type;
  }

  //It will trigger the change event of the model!
  clearText() {
    this.value = this.model = '';
  }
}
