#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

echo "
# Help for Modules command

1. new                      - create new module
2. lerna-run <module_name>  - run command using lerna run
3. lerna-exec <module_name> - run command using lerna exec
4. yarn <module_name>       - run command using normal yarn
5. <module_name>            - run command using normal yarn (alias)
"
