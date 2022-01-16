#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

args=("$@")
if is_ci; then
  args+=("--format" "json" "--output-file" "./reports/eslint-result.json")
else
  args+=("--format" "stylish")
fi

run_nx workspace-lint &&
  run_xlerna_run "lint" -- "${args[@]}" &&
  go_back
