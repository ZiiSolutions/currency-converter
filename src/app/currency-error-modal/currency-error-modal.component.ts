import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency-error-modal',
  templateUrl: './currency-error-modal.component.html',
  styleUrls: ['./currency-error-modal.component.scss'],
})
export class CurrencyErrorModalComponent {
  // This component is not entirely needed but wanted to demonstrate use of component
  // communication. Another approach could have been to inject the service directly and
  // get the error message. Again I'm demonstrating "dumb component" design pattern.
  // By seperating logic from components you enable reuse and decrease duplication.
  @Input() errorMessage: string | null;
}
