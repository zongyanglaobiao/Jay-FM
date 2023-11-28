package com.jay.domain.song.param;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2023/11/23
 */
@Data
@Schema(name = "搜索歌曲参数")
public class SearchParam implements Serializable {
    @Serial
    private static final long serialVersionUID = 143609275875730916L;

    @Schema(description = "关键词搜索")
    private String keyword;
}
