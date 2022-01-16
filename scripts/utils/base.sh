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

export not_dry
not_dry() {
  if is_dry; then
    export DDRY="true"
    unset DRY DRYRUN
  fi
}

export revert_dry
revert_dry() {
  if test -n "$DDRY"; then
    export DRY="$DDRY"
  fi
}

export run_cmd
run_cmd() {
  if is_dry; then
    log_info "cmd" "$" "$@"
    return
  else
    log_debug "cmd" "$" "$@"
  fi

  local cmd="$1" && shift
  local args=("$@") exitcode=-1

  "$cmd" "${args[@]}"
  exitcode="$?"

  if [[ "$exitcode" != 0 ]]; then
    log_error "cmd" "command $cmd exit code is $exitcode"
    return $exitcode
  fi
}

export run_source
run_source() {
  if is_dry; then
    log_info "source" "$" "source $*"
  else
    log_debug "source" "$" "source $*"
  fi

  local cmd="$1" && shift
  local args=("$@") exitcode=-1

  # shellcheck disable=SC1090
  source "$cmd" "${args[@]}"
  exitcode="$?"

  if [[ "$exitcode" != 0 ]]; then
    log_error "source" "source file ($cmd) exit code is $exitcode"
    return $exitcode
  fi
}

export find_command_file
find_command_file() {
  local callback="$1"
  local command_finder="$2"

  local command_path
  local last next current arguments=() # /a/b/c/d | /a/b/c//d | /a/b//c/d
  last="${command_finder%/*}"          # /a/b/c   | /a/b/c    |
  next="${last##*/}"                   # c        | c
  current="${command_finder##*/}"      # d        | d

  while [[ "$next" != "scripts" ]]; do
    log_debug "Loop" "last directory    : $last"
    log_debug "Loop" "processing name   : $current (next = '$next')"
    log_debug "Loop" "current argument  : ${arguments[*]}"

    if [[ "$last" = */ ]]; then
      log_debug "Loop" "parser            : custom mode"

      last="${last%/*}" # left shift 1
      next="${last##*/}"
      last="${last%/*}"

      new_argument="$next/$current"
      log_debug "Loop" "new argument      : $new_argument"
      if [[ "$next" =~ ^@ ]]; then
        log_debug "Loop" "checker           : custom checker"

        command_path="$last/$DYNAMIC_PACKAGES_DIRECTORY/${arguments[0]}.sh"
        log_debug "Loop" "checker           : $command_path"
        if test -f "$command_path"; then
          arguments[0]="$new_argument"
          log_debug "Loop" "custom argument   : ${arguments[*]}"
          $callback "$command_path" "${arguments[@]}"
          return $?
        fi
      fi
      arguments=("$new_argument" "${arguments[@]}")

      current="${last##*/}"
      last="${last%/*}"
      next="${last##*/}"
    else
      log_debug "Loop" "parser            : normal mode"
      command_path="$last/$current.sh"
      if test -f "$command_path"; then
        $callback "$command_path" "${arguments[@]}"
        return $?
      fi

      arguments=("$current" "${arguments[@]}")
      log_debug "Loop" "new argument      : $current"

      current="$next"
      last="${last%/*}"
      next="${last##*/}"
    fi

    log_debug "Loop" "next name         : $current (next = '$next')"
    log_debug "Loop" "status            : ------------------------"
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

  run_source "$command_path" "${command_arguments[@]}"
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

export log_info
log_info() {
  log "info" "$@"
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
