package com.jay.domain.song.param;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author xxl
 * @since 2023/11/23
 */
@Schema(name = "上传歌曲参数")
@Data
public class UploadSongParam implements Serializable {
    @Serial
    private static final long serialVersionUID = 3590152253389801893L;

    @NotBlank(message = "歌手名不能为空")
    private String singer;

    @NotBlank(message = "歌曲名不能为空")
    private String songName;

    private String lyrics;

    private String translatedLyrics;

    private boolean enableDownload;

    private boolean enableModify;

    private boolean enableDelete;

    @NotBlank(message = "上传者不能为空")
    private String uploader;

    @Email(message = "邮箱格式不正确")
    private String email;

    @Schema(description = "歌曲文件")
    @NotNull(message = "文件不能为空")
    private MultipartFile songFile;
}
