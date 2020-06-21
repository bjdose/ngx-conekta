import { Provider } from '@angular/core';

export class WindowRef {
  getNativeWindow(): any {
    return window;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class DocumentRef {
  getNativeDocument(): any {
    return document;
  }
}

export const BROWSER_GLOBALS_PROVIDERS: Provider[] = [WindowRef, DocumentRef];
