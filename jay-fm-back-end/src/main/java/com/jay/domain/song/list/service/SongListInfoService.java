package com.jay.domain.song.list.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.common.service.ICommonService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongListInfoEntity;

/**
* @author xxl
* @description 针对表【folder_information(文件列表分类存储歌曲信息)】的数据库操作Service
* @createDate 2023-11-23 20:10:52
*/
public interface SongListInfoService extends ICommonService<SongListInfoEntity> {

    Page<SongListInfoEntity> searchCard(SearchParam param) throws CommonException;

}
