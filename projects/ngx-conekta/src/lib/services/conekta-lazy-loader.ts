import { Inject, Injectable, Optional } from '@angular/core';
import {
  Conekta,
  ConektaError,
  ConektaToken,
  DocumentRef,
  LazyConektaLoaderConfigLiteral,
  LAZY_CONEKTA_CONFIG,
  TokenParams,
  WindowRef,
} from '../models';
import { ConektaLoader } from './conekta-loader';

@Injectable()
export class LazyConektaLoader extends ConektaLoader {
  protected _scriptLoadingPromise: Promise<void>;
  protected _config: LazyConektaLoaderConfigLiteral;
  protected _windowRef: WindowRef;
  protected _documentRef: DocumentRef;
  protected _conekta: Conekta;
  protected readonly _SCRIPT_ID: string = 'conektaScript';

  constructor(
    @Optional() @Inject(LAZY_CONEKTA_CONFIG) config: any = null,
    w: WindowRef,
    d: DocumentRef
  ) {
    super();
    this._config = config || {};
    this._windowRef = w;
    this._documentRef = d;
  }

  getBrand = (cardNumber: string): string =>
    this._conekta.Card.getBrand(cardNumber);

  validateCVC = (cvc: string): boolean => this._conekta.Card.validateCVC(cvc);

  getLanguage = (): string => this._conekta.getLanguage();

  validateCardNumber = (cardNumber: string): boolean =>
    this._conekta.Card.validateNumber(cardNumber);

  validateCardName = (name: string): boolean =>
    this._conekta.Card.validateName(name);

  validateExpirationDate = (month: string, year: string): boolean =>
    this._conekta.Card.validateExpirationDate(month, year);

  tokenize = (
    params: TokenParams,
    successCallback: (conektaToken: ConektaToken) => void,
    errorCallback: (error: ConektaError) => void
  ) => this._conekta.Token.create(params, successCallback, errorCallback);

  load(): Promise<void> {
    const window = this._windowRef.getNativeWindow() as any;
    if (window && window.Conekta) {
      // Conekta lib already loaded on the page.
      return Promise.resolve();
    }

    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    // this can happen in HMR situations or Stackblitz.io editors.
    const scriptOnPage = this._documentRef
      .getNativeDocument()
      .getElementById(this._SCRIPT_ID);
    if (scriptOnPage) {
      this._assignScriptLoadingPromise(scriptOnPage);
      return this._scriptLoadingPromise;
    }

    const script = this._documentRef
      .getNativeDocument()
      .createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.id = this._SCRIPT_ID;
    script.src = this._getScriptSrc();

    this._assignScriptLoadingPromise(script);

    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  protected _getScriptSrc(): string {
    return 'https://cdn.conekta.io/js/latest/conekta.js';
  }

  private _assignScriptLoadingPromise(scriptElem: HTMLElement) {
    this._scriptLoadingPromise = new Promise<void>(
      (resolve: () => void, reject: (error: Event) => void) => {
        scriptElem.onload = () => {
          this._conekta = this._windowRef.getNativeWindow()['Conekta'];
          this._conekta.setPublicKey(this._config.publicKey);
          this._conekta.setLanguage('es');
          resolve();
        };
        scriptElem.onerror = (error: Event) => {
          reject(error);
        };
      }
    );
  }
}
