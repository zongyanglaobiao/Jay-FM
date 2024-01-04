package com.jay.domain.song.list.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.CommonPageRequestUtils;
import com.jay.domain.common.ServicesUtil;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.list.service.SongListInfoService;
import com.jay.repository.entities.SongListInfoEntity;
import com.jay.repository.mapper.SongListInfoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
* @author xxl
* @description 针对表【folder_information(文件列表分类存储歌曲信息)】的数据库操作Service实现
* @createDate 2023-11-23 20:10:52
*/
@Service
@RequiredArgsConstructor
public class SongListInfoServiceImpl extends ServiceImpl<SongListInfoMapper, SongListInfoEntity> implements SongListInfoService {

    //todo 只要是未达到目的的皆是500

    @Override
    public Page<SongListInfoEntity> searchCard(SearchParam param) {
        String keyword = param.getKeyword();

        if (StrUtil.isBlank(keyword)) {
            return this.page(CommonPageRequestUtils.defaultPage(), this.getWrapper());
        }

        //关键字搜索
        LambdaQueryWrapper<SongListInfoEntity> newWrapper = ServicesUtil.keyWordSearch(keyword,
            SongListInfoEntity::getName,
            SongListInfoEntity::getTextDescribe,
            SongListInfoEntity::getEmail,
            SongListInfoEntity::getCreator);

        return this.page(CommonPageRequestUtils.defaultPage(),newWrapper);
    }
}




