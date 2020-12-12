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

export run_node_module_bin
run_node_module_bin() {
  local command_name="$1"
  shift
  local command_args=("$@")
  local command_path="${ROOT_PATH}/node_modules/.bin/${command_name}"

  log_debug "${command_name}" "$" "${command_path}" "${command_args[*]}"
  if ! is_dry; then
    if "${command_path}" "${command_args[*]}"; then
      return 0
    else
      exit 1
    fi
  fi
}
