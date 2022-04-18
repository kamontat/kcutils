#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

run_many_nx \
  --all \
  --target clean \
  --exclude=@kcinternal/runners \
  --exclude=@kcinternal/commandline

cleanup_paths=("*.tsbuildinfo" "lib" "lerna-debug.log" "junit.xml" "reports" "coverage")
# If call with argument e.g. `clean.sh --all`
if test -n "$1"; then
  cleanup_paths+=("node_modules" "yarn.lock")
fi

for cleanup in "${cleanup_paths[@]}"; do
  if test -f "$cleanup" || test -d "$cleanup"; then
    log_debug "Cleanup" "$" "rm" "-rf" "$cleanup"
    if ! is_dry; then
      rm -rf "$cleanup"
    fi
  fi
done

go_back
