package com.jay.repository.common;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * 通用实体，因为大部分表的某些字段一样
 * @author xxl
 * @since 2023/11/9
 */
@Data
public class CommonEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = -3311980309727025131L;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    /** 创建人 */
    @TableField(fill = FieldFill.INSERT)
    private String createUser;

    /** 更新时间 */
    @TableField(fill = FieldFill.UPDATE)
    private Date updateTime;

    /** 更新人 */
    @TableField(fill = FieldFill.UPDATE)
    private String updateUser;
}
