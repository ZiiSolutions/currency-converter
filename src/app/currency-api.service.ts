import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { AppConfigService } from './app-config.service';
import {
  CurrencyConversionDetail,
  CurrencyConversionResponse,
  CurrencySymbolResponse,
  CurrencySymbols,
} from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  constructor(
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) {}

  private readonly _errorInfo = new Subject<string>();
  private readonly _convertedCurrencyData =
    new Subject<CurrencyConversionDetail>();

  fetchCurrencySymbols(): Observable<CurrencySymbols> {
    const params = new URLSearchParams({
      access_key: this.appConfig.apiKey,
    });

    return this.httpClient
      .get<CurrencySymbolResponse>(
        `${this.appConfig.apiBaseUrl}/symbols?${params}`
      )
      .pipe(map((res) => res.symbols));
  }

  fetchCurrencyConversion(from: string, to: string, amount: string) {
    // Note I was not truly able to test this as I do not have access to the conversion API.
    // Having read the documentation this logic looks right and should work if an API key
    // with correct access is provided.
    const params = new URLSearchParams({
      access_key: this.appConfig.apiKey,
      from,
      to,
      amount,
    });

    this.httpClient
      .get<CurrencyConversionResponse>(
        `${this.appConfig.apiBaseUrl}/convert?${params}`
      )
      .subscribe({
        next: (res: CurrencyConversionResponse) => {
          if (!res) {
            return;
          }

          // In some cases the API will return a error response whilst returning a 200
          // For example is access is restricted to an endpoint, instead of 403 it returns
          // 200. To this end errors are handled with handleApiErrorResponse()
          !res.success
            ? this.handleApiErrorResponse(res)
            : this._convertedCurrencyData.next(res.query);
        },
        error: (err: HttpErrorResponse) => this.handleErrors(err),
      });
  }

  get currencyConversions(): Observable<CurrencyConversionDetail> {
    return this._convertedCurrencyData.asObservable();
  }

  get errorMessage(): Observable<string> {
    return this._errorInfo.asObservable();
  }

  private handleApiErrorResponse(res: CurrencyConversionResponse) {
    if (res && res.error) {
      this._errorInfo.next(res.error.info);
    }
  }

  private handleErrors(err: HttpErrorResponse) {
    // Handle both client & server errors. Would be good to create an interface for server side error.
    // However, leaving it as is for simplicity.
    const errorMsg =
      err.error instanceof Error
        ? `Client side error occurred: ${err.error.message}`
        : `Server returned error code ${err.status}`;
    this._errorInfo.next(errorMsg);
  }
}
