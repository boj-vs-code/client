#!/bin/bash

if [ $# = 1 ]; then
    npm run test && git commit -m "$1"
else
    echo "Usage: $0 'commit message'"
fi;
