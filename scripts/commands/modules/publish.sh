#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

# Step 1: Get version key from input argument
version_key="" # [ latest | next | beta | alpha ] (Version key in npm registry)
case "$1" in
"live")
  version_key="latest"
  ;;
"rc")
  version_key="next"
  ;;
"beta")
  version_key="beta"
  ;;
"alpha")
  version_key="alpha"
  ;;
*)
  log_error "Publish" "You might pass publish key [ live | rc | beta | alpha ] as first parameters"
  exit 6
  ;;
esac

# Step 2: Defined command parameters and custom base on environment
args=("from-git")
is_ci && args+=("--yes" "--no-verify-access")

# Step 3: Run command with custom parameters
run_xlerna "publish" \
  "${args[@]}" \
  --dist-tag "$version_key"

go_back
