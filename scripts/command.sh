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
export COMMAND_VERSION="0.2.2"
export COMMAND_LAST_UPDATED="09 Dec 2021"

export TMP_DIRECTORY="$PWD"
cd "$(dirname "$0")/.." || exit 2

export ROOT_PATH="$PWD"
export SCRIPT_PATH="${ROOT_PATH}/scripts"
export CONSTANTS_PATH="${SCRIPT_PATH}/constants"
export COMMAND_PATH="${SCRIPT_PATH}/commands"
export COMMON_PATH="${SCRIPT_PATH}/utils"

########################################
# Download constants
########################################

# shellcheck disable=SC1091
source "$CONSTANTS_PATH/special_key.sh" || exit 3
# shellcheck disable=SC1091
source "$CONSTANTS_PATH/alias.sh" || exit 3
# shellcheck disable=SC1091
source "$CONSTANTS_PATH/mapper.sh" || exit 3

########################################
# Download libraries
########################################

# shellcheck disable=SC1091
source "$COMMON_PATH/base.sh" || exit 4
# shellcheck disable=SC1091
source "$COMMON_PATH/yarn.sh" || exit 4
# shellcheck disable=SC1091
source "$COMMON_PATH/lerna.sh" || exit 4
# shellcheck disable=SC1091
source "$COMMON_PATH/nx.sh" || exit 4
# shellcheck disable=SC1091
source "$COMMON_PATH/location.sh" || exit 4
# shellcheck disable=SC1091
source "$COMMON_PATH/alias.sh" || exit 4

########################################
# Setup
########################################

command_rawpath="$(resolve_alias "$@")"
log_debug "Path" "final command path: ${command_rawpath}"

is_ci && log_warn "Message" "You running in CI mode"
is_dry && log_warn "Message" "You running in Dry mode"

########################################
# Core execution
########################################

if ! find_command_file source_command_file "${COMMAND_PATH}/${command_rawpath}"; then
  exitcode="5"
  log_error "Error" "Cannot found command '${*}' (code=$exitcode)"

  exit "$exitcode"
fi

########################################
# Cleanup
########################################

go_back
cleanup
