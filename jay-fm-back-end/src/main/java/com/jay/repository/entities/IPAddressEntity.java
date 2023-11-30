package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * @author xxl
 * @since 2023/11/9
 */
@Data
@TableName("ip_address")
@Schema(name = "IP模型对象")
public class IPAddressEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 4898447971915865335L;

    private String id;

    private String ip;

    private String address;

    @Schema(description = "是否禁止访问")
    private boolean disable;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    private Integer visitsCount;
}
