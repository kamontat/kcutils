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

export run_yarn
run_yarn() {
  local args=("$@")

  run_cmd "yarn" "--no-progress" "--silent" "${args[@]}"
}

export run_xyarn
run_xyarn() {
  local command_name command_args command_path
  command_name="$1"
  shift
  command_args=("$@")
  command_path="$(yarn bin "$command_name")"
  if test -n "$command_path"; then
    run_cmd "$command_path" "${command_args[@]}"
  fi
  return 1
}

export run_yarn_workspace
run_yarn_workspace() {
  local package_name="$1"
  shift
  local args=("$@")
  run_yarn "workspace" "$package_name" "$@"
}

export run_yarn_workspaces
run_yarn_workspaces() {
  local args=("$@")
  run_yarn "workspaces" "run" "$@"
}
