#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ How to:       release cmd=version type=[beta|alpha|rc|live]
#/               release cmd=publish
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

run_lerna() {
  echo "[debug] cmd = $lerna ${*}"
  $lerna "$@"
}

for i in "$@"; do
  if [[ "$i" =~ "=" ]]; then

    key="${i%=*}"
    value="${i#*=}"

    if [[ $key == "type" ]] || [[ $key == "cmd" ]] || [[ $key == "CI" ]]; then
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
    prefix="auto"
    suffix="[skip ci]"
    version_params+=("--yes")
  fi

  if [[ "$type" == "alpha" ]]; then
    run_lerna "${version_params[@]}" \
      --preid alpha \
      --conventional-prerelease \
      --message "chore(prerelease): $prefix publish alpha version $suffix"
  elif [[ "$type" == "beta" ]]; then
    run_lerna "${version_params[@]}" \
      --preid beta \
      --conventional-prerelease \
      --message "chore(prerelease): $prefix publish beta version $suffix"
  elif [[ "$type" == "rc" ]]; then
    run_lerna "${version_params[@]}" \
      --preid rc \
      --conventional-prerelease \
      --message "chore(prerelease): $prefix publish release candidate version $suffix"
  elif [[ "$type" == "live" ]]; then
    run_lerna "${version_params[@]}" \
      --conventional-graduate \
      --message "chore(release): $prefix publish public version $suffix"
  else
    run_lerna "${version_params[@]}" \
      --message "chore(release): $prefix release $suffix"
  fi
elif [[ "$cmd" == "publish" ]] || [[ "$cmd" == "p" ]]; then
  if [[ $CI == "true" ]]; then
    publish_params+=("--yes")
  fi

  run_lerna "${publish_params[@]}"
else
  echo "unknown cmd = ${cmd}" && exit 3
fi
