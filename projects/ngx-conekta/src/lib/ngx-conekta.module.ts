import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  BROWSER_GLOBALS_PROVIDERS,
  LazyConektaLoaderConfigLiteral,
  LAZY_CONEKTA_CONFIG,
} from './models';
import {
  ConektaLoader,
  ConektaValidators,
  LazyConektaLoader,
} from './services';

@NgModule()
export class ConektaModule {
  /**
   * Please use this method when you register the module at the root level.
   */
  static forRoot(
    lazyConektaLoaderConfig?: LazyConektaLoaderConfigLiteral
  ): ModuleWithProviders<ConektaModule> {
    return {
      ngModule: ConektaModule,
      providers: [
        ...BROWSER_GLOBALS_PROVIDERS,
        { provide: ConektaLoader, useClass: LazyConektaLoader },
        {
          provide: LAZY_CONEKTA_CONFIG,
          useValue: lazyConektaLoaderConfig,
        },
        ConektaValidators,
      ],
    };
  }
}
