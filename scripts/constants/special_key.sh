#!/usr/bin/env bash
# shellcheck disable=SC1000

# generate by create-script-file v4.0.1
# link (https://github.com/Template-generator/create-script-file/tree/v4.0.1)

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

#/ -----------------------------------
#/ Create by:    Kamontat Chantrachirathumrong <developer@kamontat.net>
#/ Since:        16/01/2022
#/ -----------------------------------

# dynamic directory name that
# parser will match all npm scoped package to
export DYNAMIC_PACKAGES_DIRECTORY="__packages__"

# prefix key for command alias data variable
export ALIAS_PREFIX="__cmd_alias_"

# special key for specify symbol
export SP_SCOPED_KEY="_scoped_"
export SP_COLON_KEY="_colon_"
export SP_DASH_KEY="_dash_"
export SP_ASIGN_KEY="_asign_"
export SP_STAR_KEY="_star_"
export SP_DOT_KEY="_zdot_"
