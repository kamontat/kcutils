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

export LERNA_PATH="${ROOT_PATH}/node_modules/.bin/lerna"

export run_lerna
run_lerna() {
  log_debug "Lerna" "$" "$LERNA_PATH" "$@"
  if ! is_dry; then
    if "$LERNA_PATH" "$@"; then
      return 0
    else
      return 1
    fi
  fi
}

export run_xlerna
run_xlerna() {
  local args=()

  if is_ci; then
    args+=("--concurrency" "1")
  fi
  if is_debug; then
    args+=("--loglevel" "debug")
  fi

  run_lerna "${args[@]}" "$@"
}

export run_xlerna_run
run_xlerna_run() {
  local args=("--stream" "$@")
  run_xlerna "run" "${args[@]}"
}

export run_xlerna_exec
run_xlerna_exec() {
  local args=("--stream" "$@")
  run_xlerna "exec" "yarn" "${args[@]}"
}
