#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

echo
echo "Alias information"
for i in "${COMMAND_ALIAS[@]}"; do
  # [scope]>[name]=[value]
  key="${i%%=*}"     # [scope]>[name]
  scope="${key%%>*}" # [scope]
  name="${key##*>}"  # [name]
  value="${i##*=}"   # [value]
  if [[ "$scope" == "$name" ]]; then
    printf '  - %-7s => %s\n' "$key" "$value"
  else
    printf '  - %-7s => %s (scope=%s)\n' "$name" "$value" "$scope"
  fi

done
echo
