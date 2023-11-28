package com.jay.domain.song.param;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2023/11/23
 */
@Data
@Schema(name = "修改歌曲实体类")
public class ModifySongParam implements Serializable {
    @Serial
    private static final long serialVersionUID = 4182570097257036228L;

    @NotBlank(message = "歌曲id不能为空")
    private String id;

    private String name;

    private String singer;

    private String lyrics;

    private String translatedLyrics;

    private Boolean enableDownload;

    private Boolean enableModify;

    private Boolean enableDelete;

    private String uploader;

    private String email;
}
