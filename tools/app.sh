#!/usr/bin/env bash

APP="ebook-app"
PORT=80
REGISTRY="registry.cn-chengdu.aliyuncs.com/gpj-image/"$APP
if [ "$1" == "start"  ]
then
    VERSION=""
    if [ x$2 != x ]
    then
        VERSION="$2"
    else
        echo "Input version"
        exit
    fi
    docker stop $APP
    docker rm $APP
    docker pull ${REGISTRY}:${VERSION}
    docker run -d --name $APP -p $PORT:8080 ${REGISTRY}:${VERSION}
else
	echo "usage: start version"
fi
