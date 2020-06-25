KC Utils
========

====================  ====================  ====================  ====================
Quality               Violation             Code Coverage         Test
====================  ====================  ====================  ====================
|quality_banner|      |violation_banner|    |coverage_banner|     |test_banner|
`sonar dashboard`_    `sonar violation`_    `sonar coverage`_     `circleci test`_
====================  ====================  ====================  ====================

.. _`sonar dashboard`: https://sonarcloud.io/dashboard?id=kamontat_kcutils
.. _`sonar violation`: https://sonarcloud.io/project/issues?id=kamontat_kcutils&resolved=false&types=VULNERABILITY
.. _`sonar coverage`: https://sonarcloud.io/component_measures?id=kamontat_kcutils&metric=coverage&view=list
.. _`circleci test`: https://app.circleci.com/pipelines/github/kamontat/kcutils

.. |violation_banner| image:: https://img.shields.io/sonar/violations/kamontat_kcutils?format=long&server=https%3A%2F%2Fsonarcloud.io&style=flat-square
.. |coverage_banner| image:: https://img.shields.io/sonar/coverage/kamontat_kcutils?server=https%3A%2F%2Fsonarcloud.io&style=flat-square
.. |quality_banner| image:: https://img.shields.io/sonar/quality_gate/kamontat_kcutils?server=https%3A%2F%2Fsonarcloud.io&style=flat-square
.. |test_banner| image:: https://img.shields.io/circleci/build/github/kamontat/kcutils?style=flat-square

This project is monorepository contains all utilities for all projects that generate from monots_ project.

For End User
------------

This repository contains 2 scope projects ``@kcinternal`` and ``@kcutils``.

.. _monots: https://github.com/ktemplates/mono-ts

@kcinternal
^^^^^^^^^^^

This is a internal projects which contains all internal tools like compiler, eslint configuration generic testkit. Published on `org/kcinternal`_ on npm

- commandline_ - contains useful commandline for monots projects.

  - ``icompiler-tsc`` - for tsc compile without tsconfig file
  - ``icompiler-webpack`` - for webpack compile (use with @kcinternal/configuration package)
  - ``icleaner [--all]`` - for clean package results, includes log file, buildinfo, etc. This will log all files/folders that delete
  - ``itester`` - using jest to run test (use with @kcinternal/configution package)
  - ``irunner [--index <filename>]`` - using node to execute .js file. Default will find index.js file to custom pass `--index <filename>` to commandline

- configuration_ - contains useful configuration for commandline and more

  - ``eslint`` - support ``node`` and ``react``
  - ``webpack`` - support ``node`` and ``react``
  - ``jest`` - support ``node`` and ``react``

- graph_ - for generate dependencies graph for monots projects
- `react-testkit`_ - add support enzyme and other testkit for react

.. _`org/kcinternal`: https://www.npmjs.com/org/kcinternal
.. _commandline: https://www.npmjs.com/package/@kcinternal/commandline
.. _configuration: https://www.npmjs.com/package/@kcinternal/configuration
.. _graph: https://www.npmjs.com/package/@kcinternal/graph
.. _`react-testkit`: https://www.npmjs.com/package/@kcinternal/react-testkit

@kcutils
^^^^^^^^

THis is a utils projects for external projects to use

- error_  - contains error management and custom throwable
- logger_ - another logger services
- helper_ - for kcutils and might handle for external user as well

.. _error: https://www.npmjs.com/package/@kcutils/error
.. _logger: https://www.npmjs.com/package/@kcutils/logger
.. _helper: https://www.npmjs.com/package/@kcutils/helper

For Contribution User
---------------------

I create new mono repository for typescript projects. Which include ``typescript``, ``webpack`` and ``react``. For testing, I choose ``jest`` as testing framework. For linter, I choose ``eslint`` combine with ``prettier``.

How to use
----------

1. choose technology_ that you want.

.. _technology: #technology

Create new package
------------------

you can copy code from _example package. Mainly you need ``src`` folder and ``package.json`` file. And we have some optional file you might want.

Support tsc compiler
--------------------

If you want use ``icompiler-tsc`` command. You just update build command on package.json and done.

Support webpack compiler
------------------------

If you want to use ``icompiler-webpack`` command. You have to add **webpack.config.js** and **tsconfig.json** file.

Support linter and formatter
----------------------------

By default this have editorconfig file so for basic formatting like space, newline, final line it will support on most of text-editor. but for advance formatting like eslint and prettier, you have to add **.eslintrc.js** file

Support testing
---------------

If you want to use ``itester`` command. You have to add **jest.config.js** file.

Technology
----------

- CI/CD

  - github workflow - for testing only
  - circleci - for testing and deployment; Need more configuration on circleci side

- Package management

  - dependabot - for auto create and merge new package from package.json

- Commit management

  - gitgo - custom commit message which follow angular commit conversion

- Code analytics

  - sonar - for checking code smell and errors; Need more configuration on sonar side
   
.. image:: docs/graph.png
