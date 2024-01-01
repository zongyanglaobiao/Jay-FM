package com.jay.domain.song.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.param.AddSongInfoParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;

import java.util.List;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInformationService extends IService<SongInformationEntity> {

    String uploadSong(AddSongInfoParam param) ;
    List<String> uploadSong(List<AddSongInfoParam> param) ;

    void downloadSong(String downloadId) throws CommonException;

    Page<SongInformationEntity> search(SearchParam param) throws CommonException;

    String deleteSong(String songId) throws CommonException;

    String modifySong(AddSongInfoParam param) throws CommonException;
}
