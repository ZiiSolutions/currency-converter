import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, getTextContent } from '../util/test-util';

import { CurrencyErrorModalComponent } from './currency-error-modal.component';

describe('CurrencyErrorModalComponent', () => {
  let component: CurrencyErrorModalComponent;
  let fixture: ComponentFixture<CurrencyErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyErrorModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyErrorModalComponent);
    component = fixture.componentInstance;
    component.errorMessage = 'Something went wrong';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message', () => {
    expect(getTextContent(getElementByCss(fixture, 'p'))).toEqual(
      'Something went wrong'
    );
  });
});
