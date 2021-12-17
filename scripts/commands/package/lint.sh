#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

module_name="$1"
shift

# on_module_directory "$module_name"
args=("$@")
if is_ci; then
  args+=("--format" "json" "--output-file" "./reports/eslint-result.json")
else
  args+=("--format" "stylish")
fi

run_xlerna_exec "--scope" "$module_name" "--" "yarn" "lint" "${args[@]}"

# go_back
