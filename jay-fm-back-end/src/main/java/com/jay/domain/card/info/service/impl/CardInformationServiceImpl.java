package com.jay.domain.card.info.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.AssertUtils;
import com.jay.core.utils.CommonPageRequestUtils;
import com.jay.domain.card.info.service.CardInformationService;
import com.jay.domain.card.list.service.SongListService;
import com.jay.domain.common.ServicesUtil;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.service.SongInformationService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.ListInformationEntity;
import com.jay.repository.entities.SongInformationEntity;
import com.jay.repository.entities.SongListEntity;
import com.jay.repository.mapper.CardInformationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author xxl
* @description 针对表【folder_information(文件列表分类存储歌曲信息)】的数据库操作Service实现
* @createDate 2023-11-23 20:10:52
*/
@Service
@RequiredArgsConstructor
public class CardInformationServiceImpl extends ServiceImpl<CardInformationMapper, ListInformationEntity> implements CardInformationService {

    //todo 只要是未达到目的的皆是500
    private final SongInformationService songInfoService;

    private final SongListService songListService;

    @Override
    public String addCard(ListInformationEntity param) throws CommonException {
        ListInformationEntity entity = this.lambdaQuery().
            eq(ListInformationEntity::getCardName, param.getCardName()).
            one();
        AssertUtils.isNull(entity,"卡片已存在");
        this.save(Convert.convert(ListInformationEntity.class, param));
        return "成功";
    }

    @Override
    public String deleteCard(String param) throws CommonException {
        ListInformationEntity entity = this.getById(param);
        if ( ObjectUtil.isNull(entity) || !entity.getEnableDelete()) {
            throw  new CommonException("不能被删除");
        }
        return String.valueOf(this.removeById(param));
    }

    @Override
    public String modifyCard(ListInformationEntity param) throws CommonException {
        ListInformationEntity entity = this.getById(param.getId());
        AssertUtils.notNull(entity,"卡片为空");
        if (!entity.getEnableModify()) {
            throw  new CommonException("不能被修改");
        }
        BeanUtil.copyProperties(param,entity);
        return String.valueOf(this.updateById(entity));
    }

    @Override
    public Page<ListInformationEntity> searchCard(SearchParam param) throws CommonException {
        String keyword = param.getKeyword();

        if (StrUtil.isBlank(keyword)) {
            return this.page(CommonPageRequestUtils.defaultPage(), new LambdaQueryWrapper<>());
        }

        //关键字搜索
        LambdaQueryWrapper<ListInformationEntity> newWrapper = ServicesUtil.keyWordSearch(keyword,
            ListInformationEntity::getCardName,
            ListInformationEntity::getTextDescribe,
            ListInformationEntity::getEmail,
            ListInformationEntity::getCreator);

        return this.page(CommonPageRequestUtils.defaultPage(),newWrapper);
    }

    /**
     * 遇到很难的问题需要拆分
     * @param folderId
     * @return
     */
    public List<SongInformationEntity> getSongs(String folderId) {
       return  songListService.lambdaQuery().
            eq(SongListEntity::getFolderId, folderId).
            list().parallelStream().map(t -> songInfoService.getById(t.getSongId())).toList();
    }
}




