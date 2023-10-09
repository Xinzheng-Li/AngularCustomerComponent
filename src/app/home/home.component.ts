import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  autocompleteInputData = [
    { value: 1, label: 'a' },
    { value: 2, label: 'b' },
    { value: 3, label: 'c' },
    { value: 4, label: 'cutomerA' },
    { value: 5, label: 'cutomerB' },
  ]
  autocompleteInputModel = "";
  autocompleteInputValue = "";
  onChange(e: any) {
    console.log("onChange", e);
  }
  onFocus(e: any) {
    console.log("onFocus", e);
  }
  onBlur(e: any) {
    console.log("onBlur", e);
  }
  onInput(e: any) {
    console.log("inputChange", e);
  }
  onModelChange(e: any) {
    console.log("onModelChange", e);
  }
}
