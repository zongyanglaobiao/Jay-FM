package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @TableName song_in_folder
 */
@TableName(value ="song_card")
@Data
public class SongCardEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private String folderId;

    private String songId;
}
