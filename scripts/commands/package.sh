#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

module_name="$1"
command_name="$2"
shift 2

log_info "Module" "Running on '$module_name'"
on_root_directory &&
  run_nx "run" "$module_name:$command_name" "$@" &&
  go_back
