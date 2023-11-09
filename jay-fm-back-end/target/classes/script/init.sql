/*====================================*/
/*==========初始化SQL脚本===============*/
/*====================================*/
create database if not exists jay_fm_database;

use jay_fm_database;

create table if not exists SONG_INFORMATION(
    ID varchar(255) primary key comment 'ID',
    NAME varchar(255) comment '歌名',
    SINGER varchar(255) comment '歌手',
    FOLDER_INFORMATION_ID varchar(255) comment '所属文件夹',
    SIZE varchar(255) comment '歌曲大小',
    CREATE_TIME  datetime comment '创建时间',
    UPDATE_TIME  datetime comment '更新时间',
    CREATE_USER  varchar(255) comment '创建人',
    UPDATE_USER  varchar(255) comment '更新人'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '歌曲信息表';

create table if not exists FOLDER_INFORMATION(
    ID varchar(255) primary key comment 'ID',
    NAME varchar(255) comment '文件名',
    TEXT_DESCRIBE varchar(255) comment '描述',
    CREATE_TIME  datetime comment '创建时间',
    UPDATE_TIME  datetime comment '更新时间',
    CREATE_USER  varchar(255) comment '创建人',
    UPDATE_USER  varchar(255) comment '更新人'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '文件列表分类存储歌曲信息';

create table if not exists IP_ADDRESS(
    ID varchar(255) primary key comment 'ID',
    IP varchar(255) comment 'IP地址',
    ADDRESS varchar(255) comment '所属省份地址'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '存储IP信息';
