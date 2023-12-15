package com.jay.domain.card.info.param;

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
@Schema(name = "添加卡片参数类")
public class CardParam implements Serializable {
    @Serial
    private static final long serialVersionUID = -7134222788449818743L;

    @NotBlank(message = "名字不能为空")
    private String cardName;

    private String color;

    private String textDescribe;

    @NotBlank(message = "创建者不能为空")
    private String creator;

    @Email(message = "邮箱格式不正确")
    @NotBlank(message = "邮箱不能为空")
    private String email;

    private Boolean enableModify;

    private Boolean enableDelete;
}
