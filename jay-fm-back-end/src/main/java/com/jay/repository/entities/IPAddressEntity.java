package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2023/11/9
 */
@Data
@TableName("IP_ADDRESS")
public class IPAddressEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 4898447971915865335L;

    @TableId
    private String id;

    @TableField("ip")
    private String ip;

    @TableField("address")
    private String address;
}
