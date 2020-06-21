import { InjectionToken } from '@angular/core';

/**
 * Token for the config of the LazyConektaLoader. Please provide an object of type {@link
 * LazyConektaLoaderConfig}.
 */
export const LAZY_CONEKTA_CONFIG = new InjectionToken<
  LazyConektaLoaderConfigLiteral
>('apetoi-conekta LAZY_CONEKTA_CONFIG');

/**
 * Configuration for the {@link LazyConektaLoader}.
 */
export interface LazyConektaLoaderConfigLiteral {
  publicKey: string;
}

export interface Conekta {
  setPublicKey: (publicKey: string) => void;
  setLanguage: (language: string) => void;
  getLanguage: () => string;
  Card: Card;
  Token: Token;
}

export interface Card {
  getBrand: (cardNumbeR: string) => string;
  validateNumber: (cardNumber: string) => boolean;
  validateName: (name: string) => boolean;
  validateCVC: (cvc: string) => boolean;
  validateExpirationDate: (
    expiryMonth: string,
    expiryYear: string
  ) => boolean;
}

export interface Token {
  create: (
    tokenParams: TokenParams,
    successResponseHandler: (token: ConektaToken) => void,
    errorResponseHandler: (error: ConektaError) => void
  ) => void;
}

export interface TokenParams {
  card: CardParams;
  saveCustomerInformation?: boolean;
}

export interface CardParams {
  number: string;
  name: string;
  exp_year: string;
  exp_month: string;
  cvc: string;
  address?: Address;
}

export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ConektaToken {
  id: string;
  object: string;
  used: boolean;
  livemode: boolean;
}

export interface ConektaError {
  type: string;
  message: string;
  message_to_purchaser: string;
  error_code: string;
  param: string;
}
