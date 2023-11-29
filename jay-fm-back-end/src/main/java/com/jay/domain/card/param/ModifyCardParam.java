package com.jay.domain.card.param;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2023/11/29
 */
@Data
@Schema(name = "修改卡片参数类")
public class ModifyCardParam implements Serializable {
    @Serial
    private static final long serialVersionUID = 4413619390609119594L;

    @NotBlank(message = "ID不能为空")
    private String id;

    private String cardName;

    private String color;

    private String textDescribe;

    private String creator;

    private String email;

    private Boolean enableModify;

    private Boolean enableDelete;
}
