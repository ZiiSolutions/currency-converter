import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyApiService } from './currency-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Note the only reason handling the error message via app component
  // is because I wanted to demonstrate component communication.
  readonly errorMessage$: Observable<string>;
  constructor(private apiService: CurrencyApiService) {
    this.errorMessage$ = this.apiService.errorMessage;
  }
}
