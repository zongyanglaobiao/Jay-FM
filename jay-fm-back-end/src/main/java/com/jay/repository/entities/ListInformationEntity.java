package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonView;
import com.jay.domain.common.param.Param;
import com.jay.repository.common.CommonEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @TableName folder_information
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="list_information")
@Data
public class ListInformationEntity extends CommonEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonView(Param.UPDATE.class)
    @NotBlank(message = "歌单ID不能为空")
    private String id;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String cardName;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String color;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String textDescribe;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String creator;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String email;
}
