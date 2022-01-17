# KCUtils (Kamontat Utilities)

| Name     | Badge #1                 | Badge #2                   |
| -------- | ------------------------ | -------------------------- |
| Analysis | [![quality][q_img]][sdb] | [![violation][sv_img]][sv] |
| Test     | [![test][t_img]][t]      | [![coverage][sc_img]][sc]  |
| Mutator  | [![mutator][mt_img]][mt] |

This project adapted concept from mono-repository which contains all utilities for my personal projects.

- [Basic concept](#basic-concept)
- [User](#user)
  - [@kcutils](#kcutils)
  - [@kcconfig](#kcconfig)
  - [@kcinternal](#kcinternal)
  - [@kcprivate](#kcprivate)
- [Contributor](#contributor)
- [License](#license)

## Basic concept

Mono-repository managed by [lerna][lerna_link] and [nx][nx_link]. [Typescript][ts_link] is primary language but some packages still using [Javascript][js_link]. We use `tsc` as primary compiler with optional `rollup` template can be use on some project as well, `jest` as primary testing tools with `stryker` mutator supported, `eslint` as primary linter and `typedoc` as documentation website generator.

## User

This is a utilties project for another javascript/typescript repositories.
Every package on this repository separate to 3 npm scope for different purposes

1. `@kcutils` is public utilities or helpful package, will be main package for consumer
2. `@kcconfig` is configuration package, for global configuration on some framework or tools
3. `@kcinternal` is internal package, should always add to devDependencies. might useful on some libraries
4. `@kcprivate` is private package, will not publish to npm and meant to use in this repository only

### @kcutils

- <none>

### @kcconfig

- [@kcconfig/eslint-config][kcc_esl_gh]      - sharable eslint config

### @kcinternal

- [@kcinternal/runners][kci_rn_gh]      - simple chainable command
- [@kcinternal/commandline][kci_cli_gh] - commandline tools like compiler, linter, test, and more

### @kcprivate

- [@kcprivate/generator][kcp_gen_gh]      - new package generator

## Contributor

I have [CONTRIBUTING.md](./docs/CONTRIBUTING.md) guideline for setup, and maintain project.

## License

This repository hold CC-BY-SA 4.0 License. On each package might contains different license. 
More information found [here](./LICENSE)

<!-- BANNER SECTION -->

[q_img]: https://img.shields.io/sonar/quality_gate/kamontat_kcutils?server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[sv_img]: https://img.shields.io/sonar/violations/kamontat_kcutils?format=long&server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[sc_img]: https://img.shields.io/sonar/coverage/kamontat_kcutils?server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[t_img]: https://img.shields.io/github/workflow/status/kamontat/kcutils/Default/main?style=flat-square
[mt_img]: https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fkamontat%2Fkcutils%2Fmain

[sdb]: https://sonarcloud.io/dashboard?id=kamontat_kcutils
[sv]: https://sonarcloud.io/project/issues?id=kamontat_kcutils&resolved=false&types=VULNERABILITY
[sc]: https://sonarcloud.io/component_measures?id=kamontat_kcutils&metric=coverage&view=list
[t]: https://github.com/kamontat/kcutils/actions
[mt]: https://dashboard.stryker-mutator.io/reports/github.com/kamontat/kcutils/main

<!-- USEFUL LINK SECTION -->

[lerna_link]: https://lerna.js.org/
[nx_link]: https://nx.dev/
[js_link]: https://www.javascript.com/
[ts_link]: https://www.typescriptlang.org/

<!-- GITHUB SECTION -->

[kci_rn_gh]: ./packages/internal/runners
[kci_cli_gh]: ./packages/internal/commandline

[kcc_esl_gh]: ./packages/configs/eslint-config

[kcp_gen_gh]: ./packages/private/generator
