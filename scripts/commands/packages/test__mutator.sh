#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

args=("$@")

# Add this arguments to enabled debug mode: "--logLevel" "debug" 
is_ci && args+=("--concurrency" "1")

if [[ "${#args[@]}" -gt 0 ]]; then
  args=("--" "${args[@]}")
fi

# run yarn test:mutator on every module
run_xlerna_run "test:mutator" "${args[@]}" &&
  go_back
