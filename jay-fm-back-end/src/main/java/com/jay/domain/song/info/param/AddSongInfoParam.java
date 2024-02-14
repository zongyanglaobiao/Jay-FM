package com.jay.domain.song.info.param;

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
public class AddSongInfoParam implements Serializable {



    @NotBlank(message = "歌曲名不能为空")
    private String songName;

    @NotBlank(message = "歌手名不能为空")
    private String singer;

    private Integer enableDownload;

    private String lyrics;

    private String translatedLyrics;

    @NotBlank(message = "上传人不能为空")
    private String uploader;

    private Integer enableModify;

    private Integer enableDelete;

    @Email(message = "邮箱格式不正确")
    private String email;

    @Serial
    private static final long serialVersionUID = 8046810707174848794L;

    @NotNull(message = "歌曲文件不能为空")
    private MultipartFile songFile;

    @NotBlank(message = "歌单ID不能为空")
    private String folderId;
}
