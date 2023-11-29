package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import com.jay.repository.common.CommonEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * @author xxl
 * @TableName folder_information
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="card_information")
@Data
public class CardInformationEntity extends CommonEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private String cardName;

    private String color;

    private String textDescribe;

    private String creator;

    private String email;
}
