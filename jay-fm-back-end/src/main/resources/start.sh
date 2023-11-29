#!/bin/bash

# 定义容器名变量
container_name="jay-fm-back-end"

# 检查容器是否存在
if docker ps -a --format '{{.Names}}' | grep -q $container_name; then
    # 如果容器存在，则删除
    docker rm -f $container_name
    echo "container_name = $container_name is delete"
else
    # 如果容器不存在，则提示
    echo "container_name =  $container_name not exist"
fi

# 接收参数，参数为jar包的名称
jar_file=$1

docker run -d --name=$container_name -p 8080:8080 -v /home/server/song-service:/home/server/song-service  openjdk:17 java -jar /home/server/song-service/$jar_file --mpw.key=ecd6512983e137cc

# 检查容器是否运行
if docker ps --format '{{.Names}}' | grep -q $container_name; then
    echo "container_name = $container_name start success"
else
    echo "container_name = $container_name start fail"
fi
