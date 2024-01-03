package com.jay.domain.song.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.common.service.CommonService;
import com.jay.domain.song.param.AddSongInfoParam;
import com.jay.domain.song.param.ModifySongInfoParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;

import java.util.List;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInformationService extends CommonService<SongInformationEntity> {


    void downloadSong(String downloadId) throws CommonException;

    Page<SongInformationEntity> search(SearchParam param) throws CommonException;

    String deleteSong(String songId) throws CommonException;

    String add(List<AddSongInfoParam> param);

    String modify(ModifySongInfoParam param) throws CommonException;
}
