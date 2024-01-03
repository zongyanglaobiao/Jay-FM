package com.jay.domain.song.param;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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

    private Boolean enableDownload;

    private String lyrics;

    private String translatedLyrics;

    private String uploader;

    private Boolean enableModify;

    private Boolean enableDelete;

    private String email;

    @Serial
    private static final long serialVersionUID = 8046810707174848794L;
}
