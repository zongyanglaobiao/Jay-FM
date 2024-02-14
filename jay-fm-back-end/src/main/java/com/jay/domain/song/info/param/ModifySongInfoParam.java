package com.jay.domain.song.info.param;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2024/1/1
 */
@Data
public class ModifySongInfoParam implements Serializable {

    @NotBlank(message = "歌曲ID不能为空")
    private String id;

    private String songName;

    private String singer;

    private Integer enableDownload;

    private String lyrics;

    private String translatedLyrics;

    private String uploader;

    private Integer enableModify;

    private Integer enableDelete;

    private String email;

    @Serial
    private static final long serialVersionUID = 8046810707174848794L;
}
