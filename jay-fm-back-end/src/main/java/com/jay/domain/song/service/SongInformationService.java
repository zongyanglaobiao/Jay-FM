package com.jay.domain.song.service;

import com.jay.core.resp.RespEntity;
import com.jay.domain.song.param.ModifySongParam;
import com.jay.domain.song.param.SearchParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInformationService extends IService<SongInformationEntity> {

    String uploadSong(UploadSongParam param) throws IOException, CommonException;

    String uploadSong(MultipartFile file) throws IOException, CommonException;

    void downloadSong(String downloadId) throws CommonException;

    RespEntity<String> search(SearchParam param);
}
