#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ How to:       runner on=[<dependency_name>] cmd=<package_script_name> type=<exec|run>
#/ -----------------------------------
#/ Create by:    Kamontat Chantrachirathumrong <developer@kamontat.net>
#/ Since:        03/06/2020
#/ -----------------------------------
#/ Error code    1      -- unknown error
#/ Error code    2      -- require key not found
#/ Error code    3      -- type not found
#/ -----------------------------------

# Option 1
cd "$(dirname "$0")/.." || exit 1

lerna="${PWD}/node_modules/.bin/lerna"

# help:
#

params=("--stream")
on=""
type=""
cmd=""

for i in "$@"; do
  if [[ "$i" =~ "=" ]]; then

    key="${i%=*}"
    value="${i#*=}"

    if [[ $key == "on" ]] || [[ $key == "cmd" ]] || [[ $key == "type" ]]; then
      eval "${key}=${value}"
    else
      echo "unknown key $key: add as parameters instead"
      params+=("$i")
    fi
  else
    params+=("$i")
  fi
done

[[ "$type" == "" ]] && echo "no 'type' key" && exit 2
[[ "$cmd" == "" ]] && echo "no 'cmd' key" && exit 2
if [[ "$on" != "" ]]; then
  params+=("--scope" "$on")
fi

# handle ci environment
if [[ $CI == "true" ]]; then
  params+=("--concurrency" "1")
fi

if [[ "$type" == "exec" ]]; then
  echo "[debug] cmd = $lerna exec yarn '${cmd}' '${params[*]}'"
  $lerna exec yarn "${cmd}" "${params[@]}"
elif [[ "$type" == "run" ]]; then
  echo "[debug] cmd = $lerna run '${cmd}' '${params[*]}'"
  $lerna run "${cmd}" "${params[@]}"
else
  echo "unknown type = ${type}" && exit 3
fi
