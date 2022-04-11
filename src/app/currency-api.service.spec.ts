import { TestBed } from '@angular/core/testing';

import { CurrencyApiService } from './currency-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppConfigService } from './app-config.service';
import { Mock } from 'ts-mocks';
import { CurrencySymbolResponse } from './app-interfaces';
describe('CurrencyApiService', () => {
  let service: CurrencyApiService;
  let httpMock: HttpTestingController;

  const mockBaseUrl = 'https://some-path';
  const mockApiKey = '12kkwer3';

  function assertRequestAndFlush(url: string, response: any) {
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(response);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AppConfigService,
          useFactory: () =>
            new Mock<AppConfigService>({
              apiBaseUrl: mockBaseUrl,
              apiKey: mockApiKey,
            }).Object,
        },
      ],
    });

    // Inject the http service and test controller for each test
    service = TestBed.inject(CurrencyApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //Ensures that no request is outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchCurrencySymbols() should return expected curreny symbols', () => {
    // Mock data response from backend
    const mockRes: CurrencySymbolResponse = {
      success: true,
      symbols: { GBP: 'Pound', USD: 'Dollar' },
    };

    // Call the method in test
    service.fetchCurrencySymbols().subscribe((res) => {
      expect(res).toEqual(mockRes.symbols);
    });

    assertRequestAndFlush(
      `${mockBaseUrl}/symbols?access_key=${mockApiKey}`,
      mockRes
    );
  });

  describe('fetchCurrencyConversion()', () => {
    const to = 'usd';
    const from = 'gbp';
    const amount = '25';
    const expectedCovertRequest = `${mockBaseUrl}/convert?access_key=${mockApiKey}&from=${from}&to=${to}&amount=${amount}`;

    it('should return converted currency response on success', () => {
      const mockResponse = {
        success: true,
        query: { from, to, amount },
      };

      service.fetchCurrencyConversion(from, to, amount);
      // The test method has return type void. Since it follows observer patern,
      // Verify that the HTTP response is passed onto underlying Observable.
      service.currencyConversions.subscribe((res) => {
        expect(res).toEqual(mockResponse.query);
      });

      assertRequestAndFlush(expectedCovertRequest, mockResponse);
    });

    it('should return API error JSON response to error Observable', () => {
      const mockResponse = {
        success: false,
        error: {
          code: 105,
          type: 'access_restriction',
          info: 'You do not have access to this operation',
        },
      };

      service.fetchCurrencyConversion(from, to, amount);
      // The test method has return type void. Since it follows observer patern,
      // Verify that the HTTP response is passed onto underlying Observable.
      service.errorMessage.subscribe((res) => {
        expect(res).toEqual('You do not have access to this operation');
      });

      assertRequestAndFlush(expectedCovertRequest, mockResponse);
    });

    it('should capture server side error', () => {
      service.fetchCurrencyConversion(from, to, amount);

      service.errorMessage.subscribe((res) => {
        expect(res).toEqual('Server returned error code 404');
      });

      const request = httpMock.expectOne(expectedCovertRequest);
      // Return 404 error
      request.flush('Deliberate error', {
        status: 404,
        statusText: 'Not found',
      });
    });
  });
});
