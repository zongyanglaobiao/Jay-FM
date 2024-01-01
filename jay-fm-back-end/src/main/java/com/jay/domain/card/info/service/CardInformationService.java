package com.jay.domain.card.info.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.jay.domain.card.info.service.param.vo.SongListVO;
import com.jay.domain.common.param.SearchParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.ListInformationEntity;
import com.jay.repository.entities.SongInformationEntity;

import java.util.List;

/**
* @author xxl
* @description 针对表【folder_information(文件列表分类存储歌曲信息)】的数据库操作Service
* @createDate 2023-11-23 20:10:52
*/
public interface CardInformationService extends IService<ListInformationEntity> {

    String addCard(ListInformationEntity param) throws CommonException;

    String deleteCard(String param) throws CommonException;

    String modifyCard(ListInformationEntity param) throws CommonException;

    Page<ListInformationEntity> searchCard(SearchParam param) throws CommonException;

    List<SongInformationEntity> getSongs(String folderId);
}
