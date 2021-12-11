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
  local db=("${COMMAND_ALIAS[@]}")
  db+=("${COMMAND_MAPPER[@]}")

  local size="${#db[@]}" key key1 key2 key3 value
  log_debug "Alias" "building alias mapper size: '$size'"

  for i in "${db[@]}"; do
    key="${i%%=*}"
    value="${i##*=}"

    key1="${key//@/asign__}"
    key2="${key1//:/colon__}"
    key3="${key2//-/dash__}"
    eval "export __command_alias__$key3=\"$value\""
  done
}

__clean_alias_mapper() {
  local db=("${COMMAND_ALIAS[@]}")
  db+=("${COMMAND_MAPPER[@]}")
  
  local size="${#db[@]}" key key1 key2 key3
  log_debug "Alias" "removing alias mapper size: '$size'"

  for i in "${db[@]}"; do
    key="${i%%=*}"
    key1="${key//@/asign__}"
    key2="${key1//:/colon__}"
    key3="${key2//-/dash__}"
    eval "unset __command_alias__$key3"
  done
}

__resolve_alias() {
  local value="" input="$1" input1 input2 input3

  input1="${input//@/asign__}"
  input2="${input1//:/colon__}"
  input3="${input2//-/dash__}"

  log_debug "Alias" "searching alias data for '$input'"
  eval "value=\"\${__command_alias__$input3}\""

  if test -n "$value"; then
    log_debug "found alias $input => $value"
    echo "$value"
  else
    echo "$input"
  fi
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
