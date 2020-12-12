# Contributing to KCUtils

We want to make contributing to this project as approachable and transparent as possible.

## Setup project

1. Install required dependencies on root project by run `yarn install`
2. Install all mono-repository dependencies by run `yarn modules bootstrap`
3. Get start with `yarn modules test`

### Create new package

you can copy code from [example](./packages/_example) package. The `src` and `package.json` is a **mandatory**, other are based on your need.

1. For typescript built-in compiler (`icompiler-tsc`) - It's built-in @kcinternal/commandline no need to do anything else.
2. For typescipt webpack compiler (`icompiler-webpack`) - The **webpack.config.js** and **tsconfig.json** is required.
3. For eslint support with webpack - The **.eslintrc.js** is required. but if you only need formatting in IDE, nothing is required.
4. For testing (`itester`) - The **jest.config.js** is required.

## Pull Requests

1. Fork the repo and create your branch from `master`.
2. Pull all changes from `develop` if it not up to date.
3. If you've added code, add tests to coverage at least 80% of new code added.
4. If you've changed APIs, update the documentation (**README.md** file on each modules).
5. Ensure all test suite passes.
6. Make sure your code lints.

## Issues

I use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## License

[![license image][cc_img]][cc_link]

By contributing to KCUtils, you agree that your contributions will be licensed under its CC-BY-SA 4.0

[cc_img]: https://i.creativecommons.org/l/by-sa/4.0/88x31.png
[cc_link]: ./LICENSE

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft][reference]

[reference]: https://github.com/facebook/draft-js/blob/5dd99d327066f5f0b30b95ab95770822cff1ac65/CONTRIBUTING.md