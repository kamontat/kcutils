# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.10](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.9...@kcconfig/rollup-config@0.2.10) (2022-06-06)


### Bug Fixes

* **deps:** bump rollup from 2.72.0 to 2.75.5 ([66db3f3](https://github.com/kamontat/kcutils/commit/66db3f3abf8fd4b38cdc2b34c5385172095fb9f9))





## [0.2.9](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.8...@kcconfig/rollup-config@0.2.9) (2022-05-30)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.8](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.7...@kcconfig/rollup-config@0.2.8) (2022-05-16)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.7](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.6...@kcconfig/rollup-config@0.2.7) (2022-05-09)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.6](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.5...@kcconfig/rollup-config@0.2.6) (2022-05-02)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.5](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.4...@kcconfig/rollup-config@0.2.5) (2022-04-25)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.4](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.3...@kcconfig/rollup-config@0.2.4) (2022-04-18)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.3](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.2...@kcconfig/rollup-config@0.2.3) (2022-04-04)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.2](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.1...@kcconfig/rollup-config@0.2.2) (2022-03-28)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.2.1](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.2.0...@kcconfig/rollup-config@0.2.1) (2022-02-28)


### Performance Improvements

* **config:** add node-resolver for es2015 syntax ([349849f](https://github.com/kamontat/kcutils/commit/349849f6afdfcc508f1552b95b2d8a3a0f661793))





# [0.2.0](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.1.4...@kcconfig/rollup-config@0.2.0) (2022-02-09)


### Bug Fixes

* **core:** some variable never created and compile error ([03c05ae](https://github.com/kamontat/kcutils/commit/03c05ae1f25e1e6cd84ddf19e683df43e303a2e6))


### Features

* **apis:** add new customPackage for rollup to custom input and output base on user needs ([b3e5794](https://github.com/kamontat/kcutils/commit/b3e5794cc4cb5c92027c864633025f59ced8335d))
* **config:** add overrided config option on output level and root level ([1d26ff8](https://github.com/kamontat/kcutils/commit/1d26ff8da48802ca1505e2092c0d51e49e7e1187))





## [0.1.4](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.1.3...@kcconfig/rollup-config@0.1.4) (2022-01-24)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.1.3](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.1.2...@kcconfig/rollup-config@0.1.3) (2022-01-21)

**Note:** Version bump only for package @kcconfig/rollup-config





## [0.1.2](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.1.1...@kcconfig/rollup-config@0.1.2) (2022-01-10)


### Bug Fixes

* **config:** all kcconfig package didn't deploy all files. ([66cb696](https://github.com/kamontat/kcutils/commit/66cb6968b0ad2917b53477dd5f9fec3fba97a5ff))
* **sonar:** take sonarqube suggestion ([3c50891](https://github.com/kamontat/kcutils/commit/3c508912543396fda4ee7e93ed6226c8c0770cdc))
* **syntax:** import is not work in kcconfig scope because no es5 setup yet. ([b9e05de](https://github.com/kamontat/kcutils/commit/b9e05deeca8471df7212f710a33e075a2d8b9d5b))





## [0.1.1](https://github.com/kamontat/kcutils/compare/@kcconfig/rollup-config@0.1.0...@kcconfig/rollup-config@0.1.1) (2021-12-27)


### Performance Improvements

* **yarn:** because yarn workspace hoist the lock to root, remove all yarn.lock ([2aaf874](https://github.com/kamontat/kcutils/commit/2aaf87404c68f6b7f1ad8deb5984b5e00ba6085e))





# 0.1.0 (2021-12-26)


### Bug Fixes

* **rollup:** tsconfig setting is require to add type definition ([acf80ef](https://github.com/kamontat/kcutils/commit/acf80ef331e9b9633a8438075b03138ff038bb80))


### Features

* **package:** add new rollup config package ([1f6db8d](https://github.com/kamontat/kcutils/commit/1f6db8d228d6a4d8c6154754ac11386fdc34ad1f))
* **rollup-config:** implement new rollup config builder ([0b7959b](https://github.com/kamontat/kcutils/commit/0b7959bcccb87febc84b91e4c4100e6024a04d19))


### Performance Improvements

* **config:** because typedoc require to point to typescript code, so I will use that key instead of sourcecode key in package.json ([8fa799f](https://github.com/kamontat/kcutils/commit/8fa799f4320e7cb203fc100da842b51d56e52aed))
* **kcconfig:** update project layout to match kcconfig standard ([a15ce17](https://github.com/kamontat/kcutils/commit/a15ce17b2e93d10ecb9c883a897f2e305893ef58))
