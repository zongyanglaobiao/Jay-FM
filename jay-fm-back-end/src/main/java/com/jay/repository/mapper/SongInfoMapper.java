package com.jay.repository.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.common.service.ICommonService;
import com.jay.repository.entities.SongInfoEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author xxl
* @description 针对表【song_information(歌曲信息表)】的数据库操作Mapper
* @createDate 2023-11-22 00:44:48
* @Entity com.jay.repository.entities.SongInformationEntity
*/
public interface SongInfoMapper extends BaseMapper<SongInfoEntity> {
    List<SongInfoEntity> search(@Param("param") SearchParam param);
}




