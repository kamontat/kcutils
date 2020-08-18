# Configuration collection

| TITLE   | LATEST                               | NEXT                           |
| ------- | ------------------------------------ | ------------------------------ |
| Version | [![latest][nlatest_img]][nlatest]    | [![next][nnext_img]][nnext]    |
| Size    | [![latest][nlatest_simg]][nlatest_s] | [![next][nnext_simg]][nnext_s] |

<!-- BODY SECTION -->

## Webpack config

Required: 
1. 2 libraries installed at root project `webpack` and `webpack-cli`

```javascript
const { webpack } = require("@kcinternal/configuration");
module.exports = webpack(__dirname).build();
```

## Babel config

Required:
1. `@babel/cli`, `@babel/preset-env` and `@babel/preset-typescript` must install as devDependencies in root project
2. If you use babel runtime, you must installed following dependencies ([more][babel-runtime])
   1. `@babel/plugin-transform-runtime` must installed as devDependencies in root project
   2. `@babel/runtime` must installed as dependencies in each modules using babel compiler

```javascript
const { babel } = require("@kcinternal/configuration");

const config = babel(__dirname);
module.exports = function(api) {
  api.cache(true);

  return config.build();
}
```

<!-- IMAGE SECTION -->

[nlatest]: https://www.npmjs.com/package/@kcinternal/configuration/v/latest
[nlatest_img]: https://img.shields.io/npm/v/@kcinternal/configuration/latest?style=flat-square

[nnext]: https://www.npmjs.com/package/@kcinternal/configuration/v/next
[nnext_img]: https://img.shields.io/npm/v/@kcinternal/configuration/next?style=flat-square

[nlatest_s]: https://bundlephobia.com/result?p=@kcinternal/configuration@latest
[nlatest_simg]: https://img.shields.io/bundlephobia/min/@kcinternal/configuration/latest?style=flat-square

[nnext_s]: https://bundlephobia.com/result?p=@kcinternal/configuration@next
[nnext_simg]: https://img.shields.io/bundlephobia/min/@kcinternal/configuration/next?style=flat-square

<!-- LINKS SECTION -->

[babel-runtime]: https://babeljs.io/docs/en/babel-runtime