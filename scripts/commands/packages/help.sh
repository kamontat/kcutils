#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

echo "
# Help for Multiple Packages command

1.  bootstrap    - install and bootstrap all package (included dependencies)
2.  change       - list all change and exit zero code if has package to deploy
3.  clean [all]  - clean all generate files/folders, if all exist remove node_module as well
4.  docs         - generate and publish document website
5.  publish      - publish latest tag to npm registry using lerna publish command
6.  test:mutator - run mutation test on every packages
7.  test         - run test on every package and combine the result
8.  upgrade      - run upgrade interactive wizard (via lernaupdate command)
9.  version      - update version, create git tag and Github release
10. <yarn_cmd>   - run yarn command on each package by 'lerna run' command
"
