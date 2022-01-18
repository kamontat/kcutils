#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

args=()

# On CI, not print unit test result in console and show only coverage summary
is_ci && args+=("--runInBand" "--reporters" "jest-junit" "--coverageReporters" "text-summary" "lcov")

# run yarn test on every module
run_xlerna_run "test" -- "${args[@]}" "$@" &&
  go_back
