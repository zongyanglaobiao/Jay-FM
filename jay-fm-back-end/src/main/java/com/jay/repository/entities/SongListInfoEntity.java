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
 * @TableName song_list
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="song_list_info")
@Data
public class SongListInfoEntity extends CommonEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @JsonView(Param.NOT_IGNORE.class)
    private String id;

    @JsonView(Param.NOT_IGNORE.class)
    private String name;

    @JsonView(Param.NOT_IGNORE.class)
    private String color;

    @JsonView(Param.NOT_IGNORE.class)
    private String textDescribe;

    @JsonView(Param.NOT_IGNORE.class)
    private String creator;

    @JsonView(Param.NOT_IGNORE.class)
    private String email;
}
