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

export on_root_directory
on_root_directory() {
  export TMP_DIRECTORY="$PWD"

  log_debug "Location" "Move to root path (${ROOT_PATH})"
  cd "$ROOT_PATH" || exit 2
}

on_module_directory() {
  local module_name="$1" module_path

  export TMP_DIRECTORY="$PWD"

  not_dry
  module_path="$(run_lerna list --parseable --all --scope "${module_name}" --loglevel "error")"
  revert_dry

  if test -n "${module_path}"; then
    log_debug "Location" "Move to module '${module_name}' path (${module_path})"
    cd "$module_path" || exit 2
  else
    log_error "Location" "Cannot get information from ${module_name} ($module_path)"
    exit 2
  fi
}

go_back() {
  if test -n "$TMP_DIRECTORY"; then
    log_debug "Location" "Move back to ${TMP_DIRECTORY}"
    cd "$TMP_DIRECTORY" || exit 2
  fi

  unset TMP_DIRECTORY
}
