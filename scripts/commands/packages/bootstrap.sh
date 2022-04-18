#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

! is_ci && run_xlerna_exec "--" "yarn" "install" "--prefer-offline" # run `yarn install` on every package in local
run_xlerna "bootstrap" &&                                           # bootstrap it together
  go_back
