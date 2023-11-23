package com.jay.domain.song.service;

import com.jay.core.resp.RespEntity;
import com.jay.domain.song.param.ModifySongParam;
import com.jay.domain.song.param.SearchParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import com.baomidou.mybatisplus.extension.service.IService;

import java.io.IOException;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInformationService extends IService<SongInformationEntity> {

    String uploadSong(UploadSongParam param);

    void downloadSong(String downloadId) ;

    RespEntity<String> search(SearchParam param);
}
