package com.jay.repository.entities;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonView;
import com.jay.domain.common.param.Param;
import com.jay.repository.common.CommonEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
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

    @JsonView(Param.UPDATE.class)
    @NotBlank(message = "歌曲ID不能为空")
    private String id;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String songName;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String singer;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String lyrics;

    @JsonView(Param.IGNORE.class)
    private String likeCount;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String translatedLyrics;

    @JsonView(Param.IGNORE.class)
    private String size;

    @JsonView(Param.IGNORE.class)
    private String playCount;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private Boolean enableDownload;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String uploader;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String savePath;

    @JsonView(Param.IGNORE.class)
    private String downloadId;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String email;
}
