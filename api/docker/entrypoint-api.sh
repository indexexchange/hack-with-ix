#!/bin/sh

set -o xtrace
set -e
export NODE_ENV=$ENV
echo Running in $ENV environment !!!
MODE=${1:-run}
ENV=${ENV:-production}

  #echo "tailing"
  #exec tail -f /bin/entrypoint-api.sh

#Existence os SRC_DIR means environment is development or production-test or first time build
if [ -d "$SRC_DIR"  ]; then
    echo Verifying NPM module installation ...
    cd $SRC_DIR 
    npm install || exit $?
    echo NPM module installation verified ...

    \cp -fr $SRC_DIR/* $DEST_DIR/

    chmod 500 $DEST_DIR/*
fi

if [ "$MODE" != "--deploy" ];then
  cd $DEST_DIR
  exec npm start
fi