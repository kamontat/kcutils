#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

message_prefix=""
message_suffix="[skip ci]"

args=(
  "--exact"                      # create version without ^ or ~
  "--conventional-commits"       # use convertional commit
  "--changelog-preset" "angular" # convertional commit is angular
  "--create-release" "github"    # create release on github too
  "--sign-git-commit"            # sign git commit
  "--sign-git-tag"               # sign git tag
  "--no-private"                 # ignore private packages
)

is_ci && args+=("--yes")
is_ci && message_prefix="auto "
args+=("--message" "chore(release): ${message_prefix}publish ${version_name} version ${message_suffix}")

version_id=""   # [ '' | rc | beta | alpha ] (Add as suffix of version e.g. '1.0.0-rc.1')
version_name="" # [ live | release candidate | beta | alpha ] (Version full name writed as commit message)
case "$1" in
"live")
  version_id=""
  version_name="live"
  args+=("--conventional-graduate")
  ;;
"rc")
  version_id="rc"
  version_name="release candidate"
  args+=("--conventional-prerelease")
  ;;
"beta")
  version_id="beta"
  version_name="beta"
  args+=("--conventional-prerelease")
  ;;
"alpha")
  version_id="alpha"
  version_name="alpha"
  args+=("--conventional-prerelease")
  ;;
*)
  log_error "Publish" "You might pass publish key [ live | rc | beta | alpha ] as first parameters"
  exit 6
  ;;
esac

run_xlerna "version" \
  "${args[@]}" \
  --preid "${version_id}"

go_back
