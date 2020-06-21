import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConektaLoader } from './conekta-loader';

@Injectable()
export class ConektaValidators {
  constructor(private _conekta: ConektaLoader) {}

  cardNumberValidator = (): AsyncValidatorFn => (
    c: AbstractControl
  ): Observable<{ [key: string]: any } | null> =>
    !c.value
      ? of([])
      : of(this._conekta.validateCardNumber(c.value)).pipe(
          map((response: boolean) =>
            !response ? { cardNumberInvalid: true } : null
          )
        );

  cardNameValidator = (): AsyncValidatorFn => (
    c: AbstractControl
  ): Observable<{ [key: string]: any } | null> =>
    !c.value
      ? of([])
      : of(this._conekta.validateCardName(c.value)).pipe(
          map((response: boolean) =>
            !response ? { cardNameInvalid: true } : null
          )
        );

  cvcValidator = (): AsyncValidatorFn => (
    c: AbstractControl
  ): Observable<{ [key: string]: any } | null> =>
    !c.value
      ? of([])
      : of(this._conekta.validateCVC(c.value)).pipe(
          map((response: boolean) =>
            !response ? { cvcInvalid: true } : null
          )
        );

  expirationDateValidator = (): AsyncValidatorFn => (
    c: AbstractControl
  ): Observable<{ [key: string]: any } | null> =>
    !c.value
      ? of([])
      : of(
          this._conekta.validateExpirationDate(
            this.getExpirationDate(c.value, 0),
            this.getExpirationDate(c.value, 2)
          )
        ).pipe(
          map((response: boolean) =>
            !response ? { expirationDateInvalid: true } : null
          )
        );

  /**
   * Get expiration date from month and year
   *
   * Month: position 0
   * Year: position 2
   *
   * @param {string} date
   * @param {number} position
   * @returns {string}
   * @memberof ConektaValidators
   */
  getExpirationDate(date: string, position: number): string {
    // exp date control is a string divided by /: ex. 10/10, 12/24
    return date ? date.substr(position, 2) : '';
  }
}
