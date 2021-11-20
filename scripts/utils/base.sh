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

export is_ci
is_ci() {
  [[ "$CI" == "true" ]]
}

export is_debug
is_debug() {
  [[ "$DEBUG" == "true" ]]
}

export is_dry
is_dry() {
  [[ "$DRY" == "true" ]] ||
    [[ "$DRYRUN" == "true" ]]
}

not_dry() {
  if is_dry; then
    export DDRY="true"
    unset DRY DRYRUN
  fi
}

revert_dry() {
  if test -n "$DDRY"; then
    export DRY="$DDRY"
  fi
}

export find_command_file
find_command_file() {
  local callback="$1"
  local command_finder="$2"

  local last next current arguments=()    # a/b/c/d
  last="$(dirname "$command_finder")"     # /a/b/c
  next="$(basename "$last")"              # c
  current="$(basename "$command_finder")" # d
  last="$(dirname "$last")"               # /a/b

  while [[ "$next" != "scripts" ]]; do
    command_path="$last/$next/$current.sh"

    log_debug "Loop" "last directory    : $last"
    log_debug "Loop" "base name         : $next >> $current"
    log_debug "Loop" "current argument  : ${arguments[*]}"
    log_debug "Loop" "-------------------"

    if test -f "$command_path"; then
      $callback "$command_path" "${arguments[@]}"
      return $?
    fi

    argument="$current"
    if [[ "$next" =~ "@" ]]; then
      argument="$next/$current"

      current="$(basename "$last")"
      last="$(dirname "$last")"
      next="$(basename "$last")"
      last="$(dirname "$last")"
    else
      current="$next"
      next="$(basename "$last")"
      last="$(dirname "$last")"
    fi

    arguments=("$argument" "${arguments[@]}")
  done

  # just need to mark as error, caller will decide actual exit code
  return 1
}

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

log() {
  local key="$1" title="$2"
  shift 2
  local messages=("$@")

  printf "[%5s] %-12s:" "$key" "$title" >&2
  first=true
  for msg in "${messages[@]}"; do
    if $first; then
      printf " %s" "$msg" >&2
      first=false
    else
      printf " '%s'" "$msg" >&2
    fi
  done
  echo >&2
}

export log_debug
log_debug() {
  if is_debug; then
    log "debug" "$@"
  fi
}

export log_error
log_error() {
  log "error" "$@"
}

export log_warn
log_warn() {
  log "warn" "$@"
}

export cleanup
cleanup() {
  unset COMMAND_NAME COMMAND_VERSION COMMAND_LAST_UPDATED
  unset TMP_DIRECTORY ROOT_PATH SCRIPT_PATH CONSTANTS_PATH COMMAND_PATH COMMON_PATH

  __clean_alias_mapper
}
