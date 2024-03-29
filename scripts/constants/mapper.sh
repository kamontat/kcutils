#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ Create by:    Kamontat Chantrachirathumrong <developer@kamontat.net>
#/ Since:        10/12/2020
#/ -----------------------------------

# Syntax [{scoped_name}]>{alias_key}={alias_value}
# Command name: "packages" | "package" | "general"
# Support only [A-Z, a-z, @, -, :]
export COMMAND_MAPPER=(
  "package>test:mutator=test__mutator"
  "packages>test:mutator=test__mutator"
)
