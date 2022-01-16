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

  local size="${#db[@]}" key key1 key2 key3 key4 key5 key6 value
  log_debug "Alias" "building alias mapper size: '$size'"

  for i in "${db[@]}"; do
    value="${i##*=}"

    key="${i%%=*}"
    key1="${key//>/$SP_SCOPED_KEY}"
    key2="${key1//:/$SP_COLON_KEY}"
    key3="${key2//-/$SP_DASH_KEY}"
    key4="${key3//@/$SP_ASIGN_KEY}"
    key5="${key4//\*/$SP_STAR_KEY}"
    key6="${key5//\./$SP_DOT_KEY}"

    log_debug "Alias" "update '$ALIAS_PREFIX$key6' key with '$value'"
    eval "export $ALIAS_PREFIX$key6=\"$value\""
  done
}

__clean_alias_mapper() {
  local db=("${COMMAND_ALIAS[@]}")
  db+=("${COMMAND_MAPPER[@]}")

  local size="${#db[@]}" key key1 key2 key3 key4 key5 key6
  log_debug "Alias" "removing alias mapper size: '$size'"

  for i in "${db[@]}"; do
    key="${i%%=*}"
    key1="${key//>/$SP_SCOPED_KEY}"
    key2="${key1//:/$SP_COLON_KEY}"
    key3="${key2//-/$SP_DASH_KEY}"
    key4="${key3//@/$SP_ASIGN_KEY}"
    key5="${key4//\*/$SP_STAR_KEY}"
    key6="${key5//\./$SP_DOT_KEY}"

    log_debug "Alias" "remove '$ALIAS_PREFIX$key6' key"
    eval "unset $ALIAS_PREFIX$key6"
  done
}

__resolve_alias() {
  local value="" scoped="$1" key="$2" key1 key2 key3 key4 key5 key6

  key1="${key//:/$SP_COLON_KEY}"
  key2="${key1//-/$SP_DASH_KEY}"
  key3="${key2//@/$SP_ASIGN_KEY}"
  key4="${key3//\*/$SP_STAR_KEY}"
  key5="${key4//\./$SP_DOT_KEY}"
  key6="$scoped$SP_SCOPED_KEY$key5"

  log_debug "Alias" "searching alias data for '$key' (scoped=$scoped)"
  eval "value=\"\${$ALIAS_PREFIX$key6}\""

  if test -n "$value"; then
    log_debug "found alias $key => $value"
    echo "$value"
    return 0
  fi

  log_debug "Alias" "searching alias data for '$key' (unscoped)"
  eval "value=\"\${$ALIAS_PREFIX$key5}\""

  if test -n "$value"; then
    log_debug "found alias $key => $value"
    echo "$value"
    return 0
  fi

  echo "${key//\////}"
}

export resolve_alias
resolve_alias() {
  local output="" separator scoped

  scoped="$1"
  __build_alias_mapper
  for input in "$@"; do
    separator=""
    if test -n "$output"; then
      separator="/"
    fi

    output="$output$separator$(__resolve_alias "$scoped" "$input")"
  done

  echo "$output"
}
