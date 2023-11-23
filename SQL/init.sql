/*====================================*/
/*==========初始化SQL脚本===============*/
/*====================================*/
create database if not exists jay_fm_database;

use jay_fm_database;

create table if not exists song_information(
    id varchar(255) primary key comment 'ID',
    name varchar(255) comment '歌名',
    singer varchar(255) comment '歌手',
    lyrics varchar(255) comment '歌词',
    like_count varchar(255) comment '喜欢次数',
    translated_lyrics  varchar(255) comment '翻译歌词',
    size varchar(255) comment '歌曲大小',
    play_count varchar(255) comment '播放次数',
    enable_download boolean default true comment '是否能被下载',
    enable_modify boolean default true comment '是否能被修改',
    enable_delete boolean default true comment '是否能被删除',
    save_path varchar(255) comment '保存路径',
    download_id varchar(255) comment '下载ID',
    uploader varchar(255) comment '上传人',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '歌曲信息表';

create table if not exists card_information(
    id varchar(255) primary key comment 'ID',
    name varchar(255) comment '文件名',
    color varchar(255) comment '颜色',
    enable_modify boolean default true comment '是否能被修改',
    enable_delete boolean default true comment '是否能被删除',
    text_describe varchar(255) comment '描述',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '卡片列表分类存储歌曲信息';

create table if not exists song_card
(
    id      varchar(255) primary key comment 'ID',
    folder_id      varchar(255) comment '文件夹ID',
    song_id varchar(255) comment '歌曲ID'
) engine = innodb
  charset = utf8mb4
  collate = utf8mb4_general_ci comment '中间表';

create table if not exists ip_address(
    id varchar(255) primary key comment 'ID',
    ip varchar(255) comment 'IP地址',
    address varchar(255) comment '所属省份地址',
    disable boolean default false comment '是否禁止访问'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '存储IP信息';

create table if not exists play_list(
    id varchar(255) primary key comment 'ID',
    song_id varchar(255) comment '歌曲ID',
    playback_order varchar(255)  comment '播放顺序',
    name varchar(255) comment '播放列表名',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间',
    create_user  varchar(255) comment '创建人',
    update_user  varchar(255) comment '更新人'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '播发列表'

