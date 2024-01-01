package com.jay.domain.song.param;

import com.fasterxml.jackson.annotation.JsonView;
import com.jay.domain.common.param.Param;
import com.jay.repository.entities.SongInformationEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;

/**
 * @author xxl
 * @since 2024/1/1
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class AddSongInfoParam extends SongInformationEntity {

    @Serial
    private static final long serialVersionUID = 8046810707174848794L;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private MultipartFile file;

    @JsonView({Param.INSERT.class,Param.UPDATE.class})
    private String folderId;
}
