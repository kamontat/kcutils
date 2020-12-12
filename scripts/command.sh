#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ How to:
#/ -----------------------------------
#/ Create by:    Kamontat Chantrachirathumrong <developer@kamontat.net>
#/ Since:        10/12/2020
#/ -----------------------------------
#/ Error code    1      -- unknown error
#/ Error code    2      -- path not found
#/ Error code    3      -- common not found
#/ -----------------------------------

export COMMAND_NAME="kcutils-commander"
export COMMAND_VERSION="0.1.0"
export COMMAND_LAST_UPDATED="11 Dec 2020"

export TMP_DIRECTORY="$PWD"
cd "$(dirname "$0")/.." || exit 2

export ROOT_PATH="$PWD"
export SCRIPT_PATH="${ROOT_PATH}/scripts"
export COMMAND_PATH="${SCRIPT_PATH}/commands"
export COMMON_PATH="${SCRIPT_PATH}/utils"

# shellcheck disable=SC1090
source "$COMMON_PATH/base.sh" || exit 3
# shellcheck disable=SC1090
source "$COMMON_PATH/yarn.sh" || exit 3
# shellcheck disable=SC1090
source "$COMMON_PATH/node-modules.sh" || exit 3
# shellcheck disable=SC1090
source "$COMMON_PATH/lerna.sh" || exit 3
# shellcheck disable=SC1090
source "$COMMON_PATH/location.sh" || exit 3

command_rawpath="$(
  IFS="/"
  echo "$*"
)"

export source_command_file
source_command_file() {
  local command_path="$1"
  shift 1
  local command_arguments=("$@")
  # to remove all argument from root command
  shift "$#"

  log_debug "Initial" "Found running script at $command_path"
  log_debug "Initial" "$" "source" "$command_path" "${command_arguments[@]}"

  # shellcheck disable=SC1090
  source "$command_path" "${command_arguments[@]}"
}

is_ci && log_warn "Message" "You running in CI mode"
is_dry && log_warn "Message" "You running in Dry mode"

if ! find_command_file source_command_file "${COMMAND_PATH}/${command_rawpath}"; then
  exitcode="5"
  log_debug "Error" "Cannot found command '${*}' (code=$exitcode)"

  exit "$exitcode"
fi

go_back
