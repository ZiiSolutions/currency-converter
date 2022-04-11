import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CurrencySymbols } from '../app-interfaces';
import { CurrencyApiService } from '../currency-api.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
})
export class CurrencyFormComponent implements OnDestroy {
  readonly currencySymbols: Observable<CurrencySymbols>;
  readonly form: FormGroup;

  private readonly destroy$ = new Subject<boolean>();
  private readonly currencyValidators = [
    Validators.required,
    Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
  ];

  constructor(private apiService: CurrencyApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      from: [0, this.currencyValidators],
      to: [0, this.currencyValidators],
      fromSymbol: ['GBP', Validators.required],
      targetSymbol: ['USD', Validators.required],
    });

    this.currencySymbols = this.apiService.fetchCurrencySymbols();
    // Update form based on API currency conversion
    this.apiService.currencyConversions
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.form.patchValue({
          to: res.to,
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit() {
    const { from, fromSymbol, targetSymbol } = this.form.value;
    this.apiService.fetchCurrencyConversion(fromSymbol, targetSymbol, from);
  }
}
