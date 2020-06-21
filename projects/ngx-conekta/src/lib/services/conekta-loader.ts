import { Injectable } from '@angular/core';
import { ConektaError, ConektaToken, TokenParams } from '../models';

@Injectable()
export abstract class ConektaLoader {
  abstract getBrand: (cardNumber: string) => string;
  abstract getLanguage: () => string;
  abstract validateCardNumber: (cardNumber: string) => boolean;
  abstract validateCardName: (name: string) => boolean;
  abstract validateCVC: (cvc: string) => boolean;
  abstract validateExpirationDate: (
    expiryMonth: string,
    expiryYear: string
  ) => boolean;
  abstract tokenize: (
    params: TokenParams,
    successCallback: (token: ConektaToken) => void,
    errorCallback: (error: ConektaError) => void
  ) => void;
  abstract load(): Promise<void>;
}
