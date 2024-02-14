/*====================================*/
/*==========初始化SQL脚本===============*/
/*====================================*/
create database if not exists jay_fm_database;

use jay_fm_database;

create table if not exists song_info(
    id varchar(255) primary key comment 'ID',
    song_name varchar(255) comment '歌名',
    singer varchar(255) comment '歌手',
    lyrics text comment '歌词',
    like_count int comment '喜欢次数',
    translated_lyrics  text comment '翻译歌词',
    play_count int comment '播放次数',
    enable_download int default 1 comment '1 可以下载 0 不能下载',
    enable_modify int default 1 comment ' 1 能修改 0 不能修改',
    enable_delete int default 1 comment ' 1 能删除 0 不能删除',
    download_id varchar(255) comment '下载ID',
    uploader varchar(255) comment '上传人',
    email varchar(255) comment '邮箱',
    list_id varchar(255) comment '歌单ID',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '歌曲信息表';


create table if not exists song_list_info(
    id varchar(255) primary key comment 'ID',
    `name` varchar(255) comment '歌单名',
    color varchar(255) comment '颜色',
    enable_modify int default 1 comment ' 1 能修改 0 不能修改',
    enable_delete int default 1 comment '是否能被 1 能删除 0 不能删除删除',
    text_describe varchar(255) comment '描述',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间',
    creator varchar(255) comment '创建者',
    email varchar(255) comment '邮箱'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '卡片列表分类存储歌曲信息';

create table if not exists file_info
(
    id      varchar(255) primary key comment 'ID',
    save_path varchar(255) comment '保存路径',
    enable_delete int default 1 comment ' 1 能删除 0 不能删除',
    enable_modify int default 1 comment ' 1 能修改 0 不能修改',
    has_used int  default 1 comment '1 使用 0 不适用',
    size double comment '歌曲大小',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间'
) engine = innodb
  charset = utf8mb4
  collate = utf8mb4_general_ci comment '歌曲列表';

create table if not exists ip_address(
    id varchar(255) primary key comment 'ID',
    ip varchar(255) comment 'IP地址',
    address varchar(255) comment '所属省份地址',
    disable int default 1 comment '是否禁止访问 1 能访问 0 不能访问',
    enable_delete int default 1 comment ' 1 能删除 0 不能删除',
    enable_modify int default 1 comment ' 1 能修改 0 不能修改',
    create_time  datetime comment '创建时间',
    update_time  datetime comment '更新时间',
    visits_count int comment '访问次数'
)engine = innodb  charset = utf8mb4 collate = utf8mb4_general_ci comment '存储IP信息';