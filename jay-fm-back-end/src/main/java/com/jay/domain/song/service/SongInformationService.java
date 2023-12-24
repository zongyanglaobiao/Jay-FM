package com.jay.domain.song.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jay.domain.song.param.ModifySongParam;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import com.baomidou.mybatisplus.extension.service.IService;

import java.io.IOException;
import java.util.List;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInformationService extends IService<SongInformationEntity> {

    String uploadSong(UploadSongParam param) ;
    List<String> uploadSong(List<UploadSongParam> param) ;

    void downloadSong(String downloadId) throws CommonException;

    Page<SongInformationEntity> search(SearchParam param) throws CommonException;

    String deleteSong(String songId) throws CommonException;

    String modifySong(ModifySongParam param) throws CommonException;
}
