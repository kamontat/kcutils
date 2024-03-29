#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

on_root_directory

depgraph_args=(
  "--file" "dist/graph/index.html"
)
typedoc_args=("--treatWarningsAsErrors")
ghpage_args=(
  "--dist" "dist"
  "--message" "chore(release): publish new document"
  "--add"
  "--dotfiles"
)

# No needs anymore
# is_ci && typedoc_args=("--logLevel" "Verbose")

run_yarn "typedoc" "${typedoc_args[@]}" &&
  run_nx "dep-graph" "${depgraph_args[@]}" &&
  run_yarn "gh-pages" "${ghpage_args[@]}" &&
  go_back
