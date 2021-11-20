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

export resolve_alias
resolve_alias() {
  local key value input="$1"

  log_debug "Alias" "searching alias data for '$input'"
  for i in "${COMMAND_ALIAS[@]}"; do
    key="${i%%=*}"
    value="${i##*=}"
    if [[ "$input" == "$key" ]]; then
      log_debug "found alias $key => $value"
      echo "$value"
      return 0
    fi
  done

  echo "$input"
}
