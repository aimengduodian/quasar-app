#!/usr/bin/env bash

RED_COLOR='\033[1;31m'      #红
GREEN_COLOR='\033[32m'      #绿
YELOW_COLOR='\033[1;33m'    #黄
BLUE_COLOR='\033[1;34m'     #蓝
PINK='\033[1;35m'           #粉红
RES='\033[0m'

APP="ebook-app"
REGISTRY="registry.cn-chengdu.aliyuncs.com/gpj-image/"$APP

starttime=`date +%s`

if [ "$1" == "build"  ]
then
    VERSION=""
    if [ x$2 != x ]
    then
        VERSION="$2"
    else
        echo "Input version"
        exit
    fi
    docker build -t ${REGISTRY}:${VERSION} .
else
  if [ "$1" == "push" ]
  then
    docker login -u 马可波罗计划 -p 1qaz2wsx registry.cn-chengdu.aliyuncs.com
    docker push ${REGISTRY}
  fi
fi

nowtime=`date +%s`
echo -e "${YELOW_COLOR}$1 SUCCESS${RES} in `expr $nowtime - $starttime`s"
