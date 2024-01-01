package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 歌曲列表
 * @author xxl
 * @TableName song_list
 */
@TableName(value ="song_list")
@Data
public class SongListEntity implements Serializable {
    /**
     * ID
     */
    @TableId
    private String id;

    /**
     * 文件夹ID
     */
    private String folderId;

    /**
     * 歌曲ID
     */
    @JsonIgnore
    private String songId;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
