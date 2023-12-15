package com.jay.domain.card.info.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.AssertUtils;
import com.jay.core.utils.CommonPageRequestUtils;
import com.jay.domain.card.info.param.CardParam;
import com.jay.domain.card.info.param.ModifyCardParam;
import com.jay.domain.card.info.service.CardInformationService;
import com.jay.domain.common.ServicesUtil;
import com.jay.domain.common.param.SearchParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.CardInformationEntity;
import com.jay.repository.mapper.CardInformationMapper;
import org.springframework.stereotype.Service;

/**
* @author xxl
* @description 针对表【folder_information(文件列表分类存储歌曲信息)】的数据库操作Service实现
* @createDate 2023-11-23 20:10:52
*/
@Service
public class CardInformationServiceImpl extends ServiceImpl<CardInformationMapper, CardInformationEntity> implements CardInformationService {

    @Override
    public String addCard(CardParam param) throws CommonException {
        CardInformationEntity entity = this.getOne(Wrappers.<CardInformationEntity>lambdaQuery().eq(CardInformationEntity::getCardName, param.getCardName()));
        AssertUtils.isNull(entity,"卡片已存在");
        this.save(Convert.convert(CardInformationEntity.class, param));
        return "成功";
    }

    @Override
    public String deleteCard(String param) {
        CardInformationEntity entity = this.getById(param);
        if ( ObjectUtil.isNull(entity) || !entity.getEnableDelete()) {
            return "不能被删除";
        }
        return String.valueOf(this.removeById(param));
    }

    @Override
    public String modifyCard(ModifyCardParam param) throws CommonException {
        CardInformationEntity entity = this.getById(param.getId());
        AssertUtils.notNull(entity,"卡片为空");
        if (!entity.getEnableModify()) {
            return "不能被修改";
        }
        BeanUtil.copyProperties(param,entity);
        return String.valueOf(this.updateById(entity));
    }

    @Override
    public Page<CardInformationEntity> searchCard(SearchParam param) throws CommonException {
        String keyword = param.getKeyword();

        if (StrUtil.isBlank(keyword)) {
            return this.page(CommonPageRequestUtils.defaultPage(),new LambdaQueryWrapper<>());
        }

        //关键字搜索
        LambdaQueryWrapper<CardInformationEntity> newWrapper = ServicesUtil.keyWordSearch(keyword,
            CardInformationEntity::getCardName,
            CardInformationEntity::getTextDescribe,
            CardInformationEntity::getEmail,
            CardInformationEntity::getCreator);

        return this.page(CommonPageRequestUtils.defaultPage(),newWrapper);
    }
}




