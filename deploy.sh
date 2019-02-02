#!/bin/bash

usage='invalid arg1, [t]est, [p]roduction needed!'
split_line='=================================='
now=$(date +%Y-%m-%d_%H-%M-%S)

if [ "$#" -ne 1 ]; then
    echo $usage
    exit 1
fi

if [ $1 = 't' ]; then
    copy_text='Copy to Test server!'
    echo $split_line
    echo 'Testing deploy:'
    echo $split_line
    npm run test
    cmd=scp
    website_path=root@10.20.129.28:/home/hhgs/dist
elif [ $1 = 'p' ]; then
    echo $split_line
    echo 'Production deploy:'
    echo $split_line
    npm run build
    cmd=zip
else
    echo $usage
    exit 1
fi

echo $split_line
if [ $1 = 't' ]; then
    echo 'copy to test server'
    echo $split_line
    $cmd -r dist/* $website_path
    # rm ./dist -rf
elif [ $1 = 'p' ]; then
    echo 'zip to hhgs_pro_'${now}'.zip'
    echo $split_line
    $cmd -m -r -q hhgs_pro_$now.zip ./dist
else
    echo $usage
    exit 1
fi

echo $split_line
echo 'Deployed!'
echo $split_line
