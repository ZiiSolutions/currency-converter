import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Mock } from 'ts-mocks';
import { CurrencyApiService } from '../currency-api.service';
import {
  getElementByCss,
  getElementByCssDebugElement,
  getElementsByCss,
  getTextContent,
} from '../util/test-util';

import { CurrencyFormComponent } from './currency-form.component';

describe('CurrencyFormComponent', () => {
  let component: CurrencyFormComponent;
  let fixture: ComponentFixture<CurrencyFormComponent>;

  function getFormFieldAtPosition(index: number) {
    const elements = getElementsByCss(fixture, 'mat-form-field');
    return elements[index];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyFormComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: CurrencyApiService,
          useFactory: () =>
            new Mock<CurrencyApiService>({
              fetchCurrencySymbols: () => of({ pak: 'rupee', gbp: 'pound' }),
              currencyConversions: of(),
            }).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display input and label stating 'from'", () => {
    const formField = getFormFieldAtPosition(0);
    const label = getElementByCssDebugElement(formField, 'mat-label');

    expect(getTextContent(label)).toEqual('From');
    expect(getElementByCssDebugElement(formField, 'input')).toBeTruthy();
  });

  it("should display label stating 'Base Currency'", () => {
    const formField = getFormFieldAtPosition(1);
    const label = getElementByCssDebugElement(formField, 'mat-label');

    expect(getTextContent(label)).toEqual('Base Currency');
  });

  it("should display input and label stating 'to' ", () => {
    const formField = getFormFieldAtPosition(2);
    const label = getElementByCssDebugElement(formField, 'mat-label');

    expect(getTextContent(label)).toEqual('To');
    expect(getElementByCssDebugElement(formField, 'input')).toBeTruthy();
  });

  it("should display label stating 'Target Currency'", () => {
    const formField = getFormFieldAtPosition(3);
    const label = getElementByCssDebugElement(formField, 'mat-label');

    expect(getTextContent(label)).toEqual('Target Currency');
  });

  it("should display a button reading  'Convert'", () => {
    expect(getTextContent(getElementByCss(fixture, 'button'))).toEqual(
      'Convert'
    );
  });

  it('should display a form ', () => {
    expect(getElementByCss(fixture, 'form')).toBeTruthy();
  });
});
