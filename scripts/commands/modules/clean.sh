#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

is_all="$(test -n "$1")"

args=()
if $is_all; then
  args+=("--" "--all")
fi

run_xlerna_run "clean:before" "${args[@]}"
run_xlerna_run "clean" "${args[@]}"
run_xlerna_run "clean:after" "${args[@]}"

cleanup_paths=("*.tsbuildinfo" "lib" "lerna-debug.log" "junit.xml" "reports" "coverage")
if $is_all; then
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
