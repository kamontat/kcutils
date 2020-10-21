# KCUtils (Kamontat Utilities)

| Quality                  | Violation                  | Code Coverage             | Test                |
| ------------------------ | -------------------------- | ------------------------- | ------------------- |
| [![quality][q_img]][sdb] | [![violation][sv_img]][sv] | [![coverage][sc_img]][sc] | [![test][t_img]][t] |

This project adapted concept from mono-repository which contains utilities for kcmono projects. Some of the project here adapted from very old libraries that didn't maintain anymore.

- [For End User](#for-end-user)
  - [@kcinternal](#kcinternal)
  - [@kcutils](#kcutils)
  - [Private](#private)
- [For Contribution User](#for-contribution-user)
- [For License](#for-license)

## For End User

This is a utilties project for another typescript repositories.
This include compiler for `typescript`, testing framework like `jest`,
frontend like `react` and code style / linter as `eslint`.
I separate the modules into 2 namespace `@kcinternal` and `@kcutils` (+ `private`).

### @kcinternal

This namespace is for project which use internally, all of them should install as devDependencies in package.json.

- [@kcinternal/commandline][kcinternal_cli_gh] - commandline tools like compiler, linter, test, and more
- [@kcinternal/config][kcinternal_config_gh]   - contains useful configuration for commandline and more
- [@kcinternal/graph][kcinternal_graph_gh]     - generates dependencies graph for kcmono project

### @kcutils

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

### Private

This is a private project which never publish to npm

- [@kcutils/example][kcutils_eg_gh]           - Example project for give idea how to create new module in this repository
- [@kcutils/graph][kcutils_graph_gh]           - Application project for generate dependencies for this repository

## For Contribution User

I have [CONTRIBUTING.md](./CONTRIBUTING.md) guideline for setup, and maintain project.

## For License

This project hold CC-BY-SA 4.0 more information found [here](./LICENSE)

<!-- BANNER SECTION -->

[q_img]: https://img.shields.io/sonar/quality_gate/kamontat_kcutils?server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[sv_img]: https://img.shields.io/sonar/violations/kamontat_kcutils?format=long&server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[sc_img]: https://img.shields.io/sonar/coverage/kamontat_kcutils?server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[t_img]: https://img.shields.io/circleci/build/github/kamontat/kcutils?style=flat-square

[sdb]: https://sonarcloud.io/dashboard?id=kamontat_kcutils
[sv]: https://sonarcloud.io/project/issues?id=kamontat_kcutils&resolved=false&types=VULNERABILITY
[sc]: https://sonarcloud.io/component_measures?id=kamontat_kcutils&metric=coverage&view=list
[t]: https://app.circleci.com/pipelines/github/kamontat/kcutils

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
