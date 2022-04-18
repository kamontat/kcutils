# Design review

**Languages:** Typescript, Javascript, Shell
**Services:** Github, Github Action, Github Pages, Npm registry, SonarCloud, DangerJS, Stryker, Mergify, Dependabot
**Utilities:** Nx, Lerna, Rollup, Jest, Eslint, Typedoc, Husky, Gitgo

## KCConfig

This should contains grab and go configuration for several services with some customizable.
All configuration should written with typescript language if possible (or json with schema).
The compiler should be tsc and eslint configured (jest is optional).
This should not depend on any internal dependencies,
however it might depend on external dependencies via peer dependencies
unless it absolutely necessary then direct dependencies can be use.

## KCInternal

This should contains internal kcutils packages.
This is not intend to been use on any application directly,
however you might use this to develop another library.
This should be depend on only `@kcconfig` or `@kcinternal`.

## KCUtilities

This is external package specified for **end-user**.

## Typings

This special namespace (`@types`) is for internal typescript definition.
This use same syntax as [https://github.com/DefinitelyTyped/DefinitelyTyped]
but it will not deploy to anywhere.

## KCPrivate

This will contains example and package usage for internal packages.
This should not be deploy to anywhere and can be viewed on repository only.

## Tools

What tools and how we using them.

### Nx & Lerna

> Nx: https://nx.dev
> Lerna: https://lerna.js.org

We using Nx as mono-repo management which support multithread tasks, caching, and more.
We using Lerna as `continuous delivery (CD)` to publish mono-repo packages to npm
