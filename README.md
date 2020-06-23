A library for loading Conekta for Angular 9.


[![Support](https://img.shields.io/badge/support-Angular%209-black.svg)](https://www.npmjs.com/package/ngx-conekta)
[![npm version](https://badge.fury.io/js/ngx-conekta.svg)](https://badge.fury.io/js/ngx-conekta)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## Installation

`ngx-conekta` is available via [npm](https://www.npmjs.com/package/ngx-conekta) and [yarn](https://yarnpkg.com/en/package/ngx-conekta)

Using npm:
```bash
$ npm install ngx-conekta --save
```

Using yarn:
```bash
$ yarn add ngx-conekta
```

## Getting Started

Import `ConektaModule` in  in the root module(`AppModule`):   
   
```typescript   
// Import library module
import { ConektaModule } from 'ngx-conekta';

@NgModule({
  imports: [
    // ...
    ConektaModule.forRoot({
      publicKey: 'my-public-key'
    })
  ]
})
export class AppModule { }
```

## Usage


### Loading conekta module

Load conekta module only when it needed.

TS

```typescript
import { ConektaLoader } from 'ngx-conekta';

constructor(private _loader: ConektaLoader) {}

// lazy loading
loadConekta() {
  this._loader
  .load()
  .then(() => {
    // conekta loaded
  })
  .catch(() => {
    // error loading conekta
  });
}
```

## License

##### The MIT License (MIT)
