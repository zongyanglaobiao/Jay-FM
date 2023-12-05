package com.jay.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.card.param.CardParam;
import com.jay.domain.card.param.ModifyCardParam;
import com.jay.domain.card.service.CardInformationService;
import com.jay.domain.common.param.SearchParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.CardInformationEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xxl
 * @since 2023/11/23
 */
@RestController
@RequestMapping(value = "/card",produces = "application/json;charset=UTF-8")
@Tag(name = "歌曲卡片管理控制器")
public class CardController implements ICommonController<RespEntity<?>, CardParam, SearchParam, ModifyCardParam,String> {

    @Resource
    private CardInformationService cardService;

    @Override
    @PostMapping(value = "/add")
    @Operation(summary = "添加歌曲卡片")
    public RespEntity<String> insert(@RequestBody @Validated CardParam param) throws Throwable {
        return RespEntity.success(cardService.addCard(param));
    }

    @Override
    @PostMapping(value = "/delete")
    @Operation(summary = "删除歌曲卡片")
    public RespEntity<String> delete(String param) {
        return RespEntity.success(cardService.deleteCard(param));
    }

    @Override
    @PostMapping(value = "/modify")
    @Operation(summary = "修改歌曲卡片")
    public RespEntity<String> update(@RequestBody @Validated ModifyCardParam param) throws Throwable {
        return RespEntity.success(cardService.modifyCard(param));
    }

    @Override
    @PostMapping(value = "/search")
    @Operation(summary = "查询歌曲卡片")
    public RespEntity<Page<CardInformationEntity>> query(@RequestBody SearchParam param) throws CommonException {
        return RespEntity.success("查询成功",cardService.searchCard(param));
    }
}
