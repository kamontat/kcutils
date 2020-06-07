# Mono Typescript

I create new mono repository for typescript projects. Which include `typescript`, `webpack` and `react`. For testing, I choose `jest` as testing framework. For linter, I choose `eslint` combine with `prettier`.

## How to use

1. choose technology that you want. [here](#technology)

## Create new package

you can copy code from _example package. Mainly you need `src` folder and `package.json` file. And we have some optional file you might want.

## Support tsc compiler

If you want use `icompiler-tsc` command. You just update build command on package.json and done.

## Support webpack compiler

If you want to use `icompiler-webpack` command. You have to add **webpack.config.js** and **tsconfig.json** file.

## Support linter and formatter

By default this have editorconfig file so for basic formatting like space, newline, final line it will support on most of text-editor. but for advance formatting like eslint and prettier, you have to add **.eslintrc.js** file

## Support testing

If you want to use `itester` command. You have to add **jest.config.js** file.

## Technology

1. CI/CD
   1. github workflow - for testing only
   2. circleci - for testing and deployment; Need more configuration on circleci side
2. Package management
   1. dependabot - for auto create and merge new package from package.json
3. Commit management
   1. gitgo - custom commit message which follow angular commit conversion
4. Code analytics
   1. sonar - for checking code smell and errors; Need more configuration on sonar side

![dependencies graph](docs/graph.png)