/*====================================*/
/*==========初始化SQL脚本===============*/
/*====================================*/
create database if not exists jay_fm_database;

use jay_fm_database;

/*==========================================*/
/*====================歌曲信息===============*/
/*==========================================*/

create table if not exists song_information(
    id varchar(255) primary key comment 'ID',
    name varchar(255) comment '歌名',
    singer varchar(255) comment '歌手',
    song_duration varchar(255) comment '歌曲时长',
    folder_id varchar(255) comment '所属文件夹',
    lyrics varchar(255) comment '歌词',
    translated_lyrics  varchar(255) comment '翻译歌词',
    size varchar(255) comment '歌曲大小',
    play_count varchar(255) comment '播放次数',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间',
    create_user  varchar(255) comment '创建人',
    update_user  varchar(255) comment '更新人'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '歌曲信息表';

/*==========================================*/
/*========歌曲管理页面的卡片信息===============*/
/*==========================================*/

create table if not exists folder_information(
    id varchar(255) primary key comment 'ID',
    name varchar(255) comment '文件名',
    color varchar(255) comment '颜色',
    text_describe varchar(255) comment '描述',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间',
    create_user  varchar(255) comment '创建人',
    update_user  varchar(255) comment '更新人'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '文件列表分类存储歌曲信息';

/*==========================================*/
/*=================记录IP===================*/
/*==========================================*/

create table if not exists ip_address(
    id varchar(255) primary key comment 'ID',
    ip varchar(255) comment 'IP地址',
    address varchar(255) comment '所属省份地址'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '存储IP信息';

/*==========================================*/
/*=================播放列表===================*/
/*==========================================*/

create table if not exists play_list(
    ID varchar(255) primary key comment 'ID',
    SONG_ID varchar(255) comment '歌曲ID',
    PLAYBACK_ORDER varchar(255)  comment '播放顺序',
    NAME varchar(255) comment '播放列表名',
    CREATE_TIME  datetime comment '创建时间',
    UPDATE_TIME  datetime comment '更新时间',
    CREATE_USER  varchar(255) comment '创建人',
    UPDATE_USER  varchar(255) comment '更新人'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '播发列表'

