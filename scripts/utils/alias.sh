#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ Create by:    Kamontat Chantrachirathumrong <developer@kamontat.net>
#/ Since:        21/11/2021
#/ -----------------------------------

__build_alias_mapper() {
  local size="${#COMMAND_ALIAS[@]}"
  log_debug "Alias" "building alias mapper size: '$size'"

  for i in "${COMMAND_ALIAS[@]}"; do
    key="${i%%=*}"
    value="${i##*=}"
    eval "export __command_alias__${key//@/asign__}=\"$value\""
  done
}

__clean_alias_mapper() {
  local size="${#COMMAND_ALIAS[@]}"
  log_debug "Alias" "removing alias mapper size: '$size'"

  for i in "${COMMAND_ALIAS[@]}"; do
    key="${i%%=*}"
    eval "unset __command_alias__${key//@/asign__}"
  done
}

__resolve_alias() {
  local value="" input="$1"
  if [[ "$input" =~ "-" ]]; then
    log_debug "Alias" "disabled searching '$input' because dash is found"

    # `-`` is not support in alias
    # To avoid unintent action, I will skip resolving if input found dash
    echo "$input"
    return
  fi

  log_debug "Alias" "searching alias data for '$input'"
  eval "value=\"\${__command_alias__${input//@/asign__}}\""

  if test -n "$value"; then
    log_debug "found alias $input => $value"
    echo "$value"
  else
    echo "$input"
  fi

  ## manually searching
  # for i in "${COMMAND_ALIAS[@]}"; do
  #   key="${i%%=*}"
  #   value="${i##*=}"
  #   if [[ "$input" == "$key" ]]; then
  #     log_debug "found alias $key => $value"
  #     echo "$value"
  #     return 0
  #   fi
  # done

  # echo "$input"
}

export resolve_alias
resolve_alias() {
  local output="" cmd

  __build_alias_mapper
  for input in "$@"; do
    cmd=""
    if test -n "$output"; then
      cmd="/"
    fi
    output="$output$cmd$(__resolve_alias "$input")"
  done

  echo "$output"
}
