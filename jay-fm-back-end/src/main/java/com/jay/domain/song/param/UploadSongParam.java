package com.jay.domain.song.param;

import io.swagger.v3.oas.annotations.media.Schema;
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

    private String singer;

    private String name;

    private String folderId;

    private String lyrics;

    private String translatedLyrics;

    private boolean enableDownload;

    private String uploader;

    @Schema(description = "歌曲文件")
    private MultipartFile songFile;
}
