#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ How to:       release [dry=true] cmd=version type=[beta|alpha|rc|live]
#/               release [dry=true] cmd=publish type=[beta|alpha|rc|live]
#/ -----------------------------------
#/ Create by:    Kamontat Chantrachirathumrong <developer@kamontat.net>
#/ Since:        07/06/2020
#/ -----------------------------------
#/ Error code    1      -- unknown error
#/ Error code    2      -- parameter(s) not found
#/ -----------------------------------

# Option 1
cd "$(dirname "$0")/.." || exit 1

lerna="${PWD}/node_modules/.bin/lerna"

version_params=(
  "version"                      # require parameters
  "--exact"                      # create version without ^ or ~
  "--force-publish"              # force publish even it exist
  "--conventional-commits"       # use convertional commit
  "--changelog-preset" "angular" # convertional commit is angular
  "--create-release" "github"    # create release on github too
  "--sign-git-commit"            # sign git commit
  "--sign-git-tag"               # sign git tag
)

publish_params=(
  "publish"
  "from-git"
)

type=""
cmd=""
dry=""

run_lerna() {
  printf "[debug] cmd = %s" "$lerna"
  for i in "$@"; do
    printf " '%s'" "$i"
  done
  echo

  if test -z "$dry"; then
    $lerna "$@"
  fi
}

on_type() {
  local t="$1"
  local prefn="$2"
  local livefn="$3"
  local fn="$4"

  if [[ "$t" == "alpha" ]] || [[ "$t" == "beta" ]] || [[ "$t" == "rc" ]]; then
    [[ "$t" == "alpha" ]] && fullname="alpha"
    [[ "$t" == "beta" ]] && fullname="beta"
    [[ "$t" == "rc" ]] && fullname="release candidate"

    $prefn "$t" "$fullname"
  elif [[ "$t" == "live" ]]; then
    "$t" == "live" && fullname="live"
    $livefn "$t" "$fullname"
  else
    $fn
  fi
}

for i in "$@"; do
  if [[ "$i" =~ "=" ]]; then

    key="${i%=*}"
    value="${i#*=}"

    if [[ $key == "type" ]] || [[ $key == "cmd" ]] || [[ $key == "dry" ]] || [[ $key == "CI" ]]; then
      eval "${key}=${value}"
    else
      echo "unknown key $key: add as parameters instead"
      params+=("$i")
    fi
  else
    params+=("$i")
  fi
done

[[ "$cmd" == "" ]] && echo "no 'cmd' key" && exit 2

if [[ "$cmd" == "version" ]] || [[ "$cmd" == "v" ]]; then
  prefix=""
  suffix=""
  if [[ $CI == "true" ]]; then
    prefix="auto "
    suffix=" [skip ci]"
    version_params+=("--yes")
  fi

  create_preversion() {
    local id="$1"
    local name="$2"

    run_lerna "${version_params[@]}" \
      --preid "$id" \
      --conventional-prerelease \
      --message "chore(prerelease): ${prefix}release $name version$suffix"
  }

  create_liveversion() {
    run_lerna "${version_params[@]}" \
      --conventional-graduate \
      --message "chore(release): ${prefix}release public version$suffix"
  }

  create_version() {
    run_lerna "${version_params[@]}" \
      --message "chore(release): ${prefix}release version$suffix"
  }

  on_type "$type" create_preversion create_liveversion create_version
elif [[ "$cmd" == "publish" ]] || [[ "$cmd" == "p" ]]; then
  if [[ $CI == "true" ]]; then
    publish_params+=("--yes")
  fi

  create_prepublish() {
    local id="$1"
    local name="$2"
    local npm_name
    [[ "$id" == "rc" ]] && npm_name="next" || npm_name="$id"

    run_lerna "${publish_params[@]}" \
      --dist-tag "$npm_name"
  }

  create_publish() {
    run_lerna "${publish_params[@]}" \
      --dist-tag "latest"
  }

  on_type "$type" create_prepublish create_publish
else
  echo "unknown cmd = ${cmd}" && exit 3
fi
