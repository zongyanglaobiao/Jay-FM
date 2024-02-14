package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import com.jay.repository.common.CommonEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2023/11/9
 */
@EqualsAndHashCode(callSuper = true)
@Data
@TableName("ip_address")
@Schema(name = "IP模型对象")
public class IPAddressEntity extends CommonEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 4898447971915865335L;

    private String id;

    private String ip;

    private String address;

    /**
     * 1 禁止 0 不禁止
     */
    @Schema(description = "是否禁止访问")
    private Integer disable;

    private Integer visitsCount;
}
