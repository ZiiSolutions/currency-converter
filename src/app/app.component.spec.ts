import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { Mock } from 'ts-mocks';
import { AppComponent } from './app.component';
import { CurrencyApiService } from './currency-api.service';
import { CurrencyErrorModalComponent } from './currency-error-modal/currency-error-modal.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { getElementByCss, getTextContent } from './util/test-util';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        MockComponents(CurrencyFormComponent, CurrencyErrorModalComponent),
      ],
      providers: [
        {
          provide: CurrencyApiService,
          useFactory: () =>
            new Mock<CurrencyApiService>({
              errorMessage: of('Some error message'),
            }).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    expect(getTextContent(getElementByCss(fixture, 'h1'))).toEqual(
      'Currency Converter'
    );
  });

  it('should display app-currency-form', () => {
    expect(getElementByCss(fixture, 'app-currency-form')).toBeTruthy();
  });

  it('should display app-currency-error-modal', () => {
    expect(getElementByCss(fixture, 'app-currency-error-modal')).toBeTruthy();
  });
});
