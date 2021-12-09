# KCUtils (Kamontat Utilities)

| Name     | Badge #1                 | Badge #2                   |
| -------- | ------------------------ | -------------------------- |
| Analysis | [![quality][q_img]][sdb] | [![violation][sv_img]][sv] |
| Test     | [![test][t_img]][t]      | [![coverage][sc_img]][sc]  |
| Mutator  | [![mutator][mt_img]][mt] |

This project adapted concept from mono-repository which contains all utilities for my personal projects.

- [Basic concept](#basic-concept)
- [User (old)](#user-old)
  - [@kcinternal (old)](#kcinternal-old)
  - [@kcutils (old)](#kcutils-old)
  - [Private (old)](#private-old)
- [Contributor](#contributor)
- [License](#license)

## Basic concept

Mono-repository managed by [lerna][lerna_link]. [Typescript][ts_link] is primary language but some packages still using [Javascript][js_link]. We use `tsc` as primary compiler with optional `parcel` or `rollup` can be use on some project as well, `jest` as primary testing tools with `stryker` mutator supported, `typedoc` as documentation website generator, and `eslint` as primary linter.

## User (old)

This is a utilties project for another typescript repositories.
This include compiler for `typescript`, testing framework like `jest`,
frontend like `react` and code style / linter as `eslint`.
I separate the modules into 2 namespace `@kcinternal` and `@kcutils` (+ `private`).

### @kcinternal (old)

This namespace is for project which use internally, all of them should install as devDependencies in package.json.

- [@kcinternal/commandline][kcinternal_cli_gh] - commandline tools like compiler, linter, test, and more
- [@kcinternal/config][kcinternal_config_gh]   - contains useful configuration for commandline and more
- [@kcinternal/graph][kcinternal_graph_gh]     - generates dependencies graph for kcmono project

### @kcutils (old)

This is a utilities projects for generic usecase

- [@kcutils/error][kcutils_err_gh]                - Error management and custom error object
- [@kcutils/logger][kcutils_log_gh]               - Another logger services
- [@kcutils/helper][kcutils_helper_gh]            - Functional utilities like lodash/ramda
- [@kcutils/models][kcutils_models_gh]            - Custom class models for multiple usecase like Optional
- [@kcutils/color][kcutils_color_gh]              - Color utilities and convertion
- [@kcutils/react-testkit][kcutils_react_test_gh] - Enzyme support and React utilities function for react
- [@kcutils/testkit][kcutils_test_gh]             - Stryker support with default configuration (Deprecated)
- [@kcutils/gatsby-config][kcutils_gsb_conf_gh]   - Gatsby Configuration Builder for Typescript project
- [@kcutils/random][kcutils_random_gh]            - Pseudorandom number generators

### Private (old)

This is a private project which never publish to npm

- [@kcutils/example][kcutils_eg_gh]           - Example project for give idea how to create new module in this repository
- [@kcutils/graph][kcutils_graph_gh]           - Application project for generate dependencies for this repository

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
[js_link]: https://www.javascript.com/
[ts_link]: https://www.typescriptlang.org/

<!-- GITHUB SECTION -->

[kcinternal_cli_gh]: ./internals/commandline
[kcinternal_config_gh]: ./internals/config
[kcinternal_graph_gh]: ./internals/graph

[kcutils_eg_gh]: ./packages/_example
[kcutils_graph_gh]: ./packages/_graph
[kcutils_err_gh]: ./packages/error
[kcutils_log_gh]: ./packages/logger
[kcutils_helper_gh]: ./packages/helper
[kcutils_models_gh]: ./packages/models
[kcutils_color_gh]: ./packages/color
[kcutils_react_test_gh]: ./packages/react-testkit
[kcutils_test_gh]: ./packages/testkit
[kcutils_gsb_conf_gh]: ./packages/gatsby-config
[kcutils_random_gh]: ./packages/random
