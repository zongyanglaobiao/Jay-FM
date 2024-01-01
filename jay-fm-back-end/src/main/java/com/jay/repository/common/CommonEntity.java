package com.jay.repository.common;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonView;
import com.jay.domain.common.param.Param;
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

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private Boolean enableModify;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private Boolean enableDelete;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    @JsonView(Param.IGNORE.class)
    private Date createTime;

    /** 更新时间 */
    @TableField(fill = FieldFill.UPDATE)
    @JsonView(Param.IGNORE.class)
    private Date updateTime;
}
