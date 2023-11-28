package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import com.jay.repository.common.CommonEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @TableName song_in_folder
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="song_card")
@Data
public class SongCardEntity extends CommonEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private String folderId;

    private String songId;

    private String email;

    private String creator;
}
