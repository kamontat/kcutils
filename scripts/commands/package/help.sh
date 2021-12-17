#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

echo "
# Help for Single Package command

1. new                          - create new package
2. add <package_name> <library> - add new library to specify package
3. lint <package_name>          - run linter in specify package
4. lerna-run <package_name>     - run command using lerna run
5. lerna-exec <package_name>    - run command using lerna exec
6. yarn <package_name>          - run command using normal yarn
7. <package_name>               - run command using normal yarn (alias)
"
