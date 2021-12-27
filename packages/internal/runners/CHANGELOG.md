# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.1](https://github.com/kamontat/kcutils/compare/@kcinternal/runners@0.1.0...@kcinternal/runners@0.1.1) (2021-12-27)


### Bug Fixes

* **core:** all public package must have publishConfig access public ([4c17ffb](https://github.com/kamontat/kcutils/commit/4c17ffb799bb44a87997101a15825366d9f55495))
* **model:** fix some bugs and add test ([d07a45b](https://github.com/kamontat/kcutils/commit/d07a45b0537a5ad50e0a31249a1e823183f0f7dd))


### Performance Improvements

* **yarn:** because yarn workspace hoist the lock to root, remove all yarn.lock ([2aaf874](https://github.com/kamontat/kcutils/commit/2aaf87404c68f6b7f1ad8deb5984b5e00ba6085e))





# 0.1.0 (2021-12-26)


### Bug Fixes

* **core:** add more test and expose new models ([4967afd](https://github.com/kamontat/kcutils/commit/4967afd2962efada617b7931d9437f556f4078ef))
* **core:** compile error due to rollback and update test ([00cab96](https://github.com/kamontat/kcutils/commit/00cab96ad2b12db014d63582c93130601608c834))
* **dep:** upgrade stryker to latest to avoid error with typescript ([e352790](https://github.com/kamontat/kcutils/commit/e352790cccfdeeab8922ef9a9f899b91c6c657d7))
* **docs:** include runners context in document website ([5b97152](https://github.com/kamontat/kcutils/commit/5b97152d837c69febe443a43d667898d9fa51382))
* **lint:** remove unused variable ([a39271e](https://github.com/kamontat/kcutils/commit/a39271e1757891e9013c743abc91bbee4c01709e))
* **lint:** update ban-types in option ([2221c4a](https://github.com/kamontat/kcutils/commit/2221c4ae5ae62f79858bca08f2ee95a6c80946e9))
* **runner:** new config apis failed ([91cf90c](https://github.com/kamontat/kcutils/commit/91cf90c433987f0d1397b0389fcd3def9d509002))
* **style:** update code to matches with standard ([0b0609a](https://github.com/kamontat/kcutils/commit/0b0609a1940fa9def1dfb2054eb9b90a3a87208d))
* **test:** compile error ([d013fee](https://github.com/kamontat/kcutils/commit/d013feea958fc55cbc2826b04dedb541b4d02e38))
* **test:** compile error on testing ([b54a576](https://github.com/kamontat/kcutils/commit/b54a576782e867fdbf64b20f3d7ffb0d3051523f))
* **test:** remove only key in unit test ([a8d1d03](https://github.com/kamontat/kcutils/commit/a8d1d03437e209353f511c694597846dfadfea9a))


### Features

* **api:** remove commands checker, let execution decide ([e136087](https://github.com/kamontat/kcutils/commit/e1360873be00b13f96246b5fa11da661caddb888))
* **model:** commandline supported custom execution in the final step ([1921fb8](https://github.com/kamontat/kcutils/commit/1921fb8323c0d3c6ae842d5e74ce42c60704a134))
* **model:** update option to support alias from option config and enable support -- argument ([4d66ad0](https://github.com/kamontat/kcutils/commit/4d66ad0fcd3174100f84d98a983c8d598506adc1))
* **rollup-config:** implement new rollup config builder ([0b7959b](https://github.com/kamontat/kcutils/commit/0b7959bcccb87febc84b91e4c4100e6024a04d19))


### Performance Improvements

* **api:** add new getOr in general context to search exist value and return ([ae0880c](https://github.com/kamontat/kcutils/commit/ae0880c3fd7e2d212402aea58b38d37e07870928))
* **api:** add Option.none for option is already string ([88af509](https://github.com/kamontat/kcutils/commit/88af509c111ab3c8fd39e6aab11f8e552ebc49a1))
* **api:** change static build function to initial() to avoid confuse with build() ([1b65f2a](https://github.com/kamontat/kcutils/commit/1b65f2ae30a51e09334f83e7c303c8df0f54a8d5))
* **config:** add stryker for typescript to avoid extra mutation test ([4dd4d2a](https://github.com/kamontat/kcutils/commit/4dd4d2a4dddc003d3ea6e19213a0bdcdf87c072a))
* **config:** rewrite config using new apis ([59bfad1](https://github.com/kamontat/kcutils/commit/59bfad14160df670a23bd98f36349eda5ad026b1))
* **docs:** remove useless version and fix warning in local ([b495a24](https://github.com/kamontat/kcutils/commit/b495a249c720260ba1e0056253b2211f4b6c00be))
* **model:** add option data and commands list to execution as well ([c622fe4](https://github.com/kamontat/kcutils/commit/c622fe4f0a7de54c6c4372e7cb5aa8eea868931b))
* **model:** move dryrun check to execution so user can custom output ([890792c](https://github.com/kamontat/kcutils/commit/890792c2fc0f031bd707eba7ba8e93372d869057))
* **models:** make commandline action to support async task ([59f63e4](https://github.com/kamontat/kcutils/commit/59f63e4f39a89ba4a90de5cab9e0581a2fb47939))
* **model:** support help option without option changes ([f1432ab](https://github.com/kamontat/kcutils/commit/f1432ab17532bd95194d5eb10901e9f1acb98248))
* rework runner to support external config and add test ([39d5c03](https://github.com/kamontat/kcutils/commit/39d5c037a3c28d38b622184c367cff0f2f305a65))





# Example CHANGELOG
