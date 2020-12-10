# Commandline helper

| TITLE   | LATEST                               | NEXT                           |
| ------- | ------------------------------------ | ------------------------------ |
| Version | [![latest][nlatest_img]][nlatest]    | [![next][nnext_img]][nnext]    |
| Size    | [![latest][nlatest_simg]][nlatest_s] | [![next][nnext_simg]][nnext_s] |

<!-- BODY SECTION -->

> DO NOT INSTALL VERSION 0.19. The source code is not included in package.

- [icompiler-tsc](#icompiler-tsc)
- [icompiler-webpack](#icompiler-webpack)
- [itester](#itester)
- [irunner](#irunner)
- [icleaner](#icleaner)
- [idocumentor](#idocumentor)

## icompiler-tsc

Condition:

1. required `tsconfig.json` file on same directory with package.json

```bash
$ yarn icompiler-tsc \
  [--dry-run] \ # dry run mean output the command to execute without executed
  [--auto] \ # this will use tsconfig.json file in commandline includes folder
  [parameters] \ # all parameters are the same as tsc command

```

## icompiler-webpack

Feature:

1. Never fails even webpack not exist

Condition:

1. required `webpack` command installed
2. required `webpack.config.js` file on same directory with package.json
3. required `tsconfig.json` file on same directory with package.json

```bash
$ yarn icompiler-webpack \
  [--dry-run] # dry run mean output the command to execute without executed
```

## itester

Feature:

1. Support auto detect CI environment
2. Never fails even jest not exist

Condition:

1. required `jest` command installed
2. required `jest.config.js` file on same directory with package.json
3. in order to run `--stryker`, required `stryker.conf.js` file and `@kcutils/testkit` installed in `devDependencies` in package.json

```bash
$ yarn itester \
  [--dry-run] # dry run mean output the command to execute without executed
  [--stryker] # enable stryker mutation test (required stryker.conf.js)
```

## irunner

Feature:

1. run lib/index.js without any parameters

Condition:

1. required `node` command installed
2. required `./lib/` directory to be exist

```bash
$ yarn irunner \
  [--index <file_name>] # custom index file name in lib/ (default is `index.js`)
```

## icleaner

Feature:

1. auto cleanup all tmp files / directories
2. log all files/directories it's deleted

```bash
$ yarn icleaner \
  [--all] # delete all files include node_modules and yarn.lock
```

## idocumentor

Feature:

1. create document page in html in `docs` folder
2. support update when increase new version via `lerna version`

Condition:

1. add `@kcinternal/configuration` for **tsdoc.json** file
2. add `typedoc` installed in dev dependencies in root `package.json`
3. add **tsdoc.json** for eslint, disabled by add `{ tsdoc: false }` in eslint option

Steps:

1. create tsdoc.json in package module
```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
  "extends": ["./node_modules/@kcinternal/configuration/includes/tsdoc.json"]
}
```

2. add 2 more scripts in `scripts` key in **package.json** file
```json
{
  "scripts": {
    "doc": "idocumentor"
  }
}
```

<!-- IMAGE SECTION -->

[nlatest]: https://www.npmjs.com/package/@kcinternal/commandline/v/latest
[nlatest_img]: https://img.shields.io/npm/v/@kcinternal/commandline/latest?style=flat-square

[nnext]: https://www.npmjs.com/package/@kcinternal/commandline/v/next
[nnext_img]: https://img.shields.io/npm/v/@kcinternal/commandline/next?style=flat-square

[nlatest_s]: https://bundlephobia.com/result?p=@kcinternal/commandline@latest
[nlatest_simg]: https://img.shields.io/bundlephobia/min/@kcinternal/commandline/latest?style=flat-square

[nnext_s]: https://bundlephobia.com/result?p=@kcinternal/commandline@next
[nnext_simg]: https://img.shields.io/bundlephobia/min/@kcinternal/commandline/next?style=flat-square
