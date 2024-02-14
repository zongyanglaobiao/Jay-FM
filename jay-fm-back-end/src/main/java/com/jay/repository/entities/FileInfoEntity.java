package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.jay.repository.common.CommonEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

/**
 * 歌曲列表
 * @TableName file_info
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="file_info")
@Data
public class FileInfoEntity extends CommonEntity implements Serializable {

    @Serial
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
     * 1 使用 0 不使用
     */
    private Integer hasUsed;

    /**
     * 歌曲大小
     */
    private Long size;
}
