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

<!-- IMAGE SECTION -->

[nlatest]: https://www.npmjs.com/package/@kcinternal/configuration/v/latest
[nlatest_img]: https://img.shields.io/npm/v/@kcinternal/configuration/latest?style=flat-square

[nnext]: https://www.npmjs.com/package/@kcinternal/configuration/v/next
[nnext_img]: https://img.shields.io/npm/v/@kcinternal/configuration/next?style=flat-square

[nlatest_s]: https://bundlephobia.com/result?p=@kcinternal/configuration@latest
[nlatest_simg]: https://img.shields.io/bundlephobia/min/@kcinternal/configuration/latest?style=flat-square

[nnext_s]: https://bundlephobia.com/result?p=@kcinternal/configuration@next
[nnext_simg]: https://img.shields.io/bundlephobia/min/@kcinternal/configuration/next?style=flat-square
