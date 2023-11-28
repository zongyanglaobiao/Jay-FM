package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import com.jay.repository.common.CommonEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="song_information")
@Data
@Schema(name = "歌曲信息实体类")
public class SongInformationEntity extends CommonEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private String songName;

    private String singer;

    private String lyrics;

    private String likeCount;

    private String translatedLyrics;

    private String size;

    private String playCount;

    private Boolean enableDownload;

    private String uploader;

    private String savePath;

    private String downloadId;

    private String email;
}
