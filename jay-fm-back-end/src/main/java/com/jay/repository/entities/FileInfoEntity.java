package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.jay.repository.common.CommonEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * 歌曲列表
 * @TableName file_info
 */
@TableName(value ="file_info")
@Data
public class FileInfoEntity extends CommonEntity implements Serializable {

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    @TableId
    private String id;

    /**
     * 保存路径
     */
    private String savePath;

    /**
     * 是否删除
     */
    private boolean hasUsed;

    /**
     * 歌曲大小
     */
    private Long size;
}
