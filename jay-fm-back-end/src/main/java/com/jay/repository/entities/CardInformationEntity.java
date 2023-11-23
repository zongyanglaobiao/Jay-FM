package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * @author xxl
 * @TableName folder_information
 */
@TableName(value ="card_information")
@Data
public class CardInformationEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private String name;

    private String color;

    private Integer enableModify;

    private Integer enableDelete;

    private String textDescribe;

    private Date createTime;

    private Date updateTime;


}
