#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

echo "
# Help for Multiple Packages command

1. bootstrap  - bootstrap all package together, same as lerna bootstrap
2. test       - run test on every package and combine the result
3. lint       - run lint on each package via 'lerna run' command
4. publish    - publish latest tag to npm registry using lerna publish command
5. version    - create git tag and Github release
6. updated    - list all changed packages
7. <yarn_cmd> - run yarn command on each package by 'lerna run' command
"
