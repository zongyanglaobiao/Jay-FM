package com.jay.domain.song.info.service;

import com.jay.domain.common.service.ICommonService;
import com.jay.repository.entities.SongInfoEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
public interface SongInfoService extends ICommonService<SongInfoEntity> {

    String save(SongInfoEntity param, MultipartFile file);

    String modify(SongInfoEntity param);

    void downloadSong(String id);

    String deleteSong(List<String> songIds);

    /**
     * 删除歌曲
     * @param songIds 删除歌曲的ID
     * @param isDeleteList 是不是删除歌单
     * @return true 删除成功 false 删除失败
     */
    String deleteSong(List<String> songIds,boolean isDeleteList);
}
