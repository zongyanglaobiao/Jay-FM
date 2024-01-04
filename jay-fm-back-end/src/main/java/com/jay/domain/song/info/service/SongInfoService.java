package com.jay.domain.song.info.service;

import com.jay.domain.common.service.ICommonService;
import com.jay.repository.entities.SongInfoEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInfoService extends ICommonService<SongInfoEntity> {

    String save(SongInfoEntity param, MultipartFile file);

    String modify(SongInfoEntity param);
}
