package com.jay.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.common.param.Param;
import com.jay.domain.card.info.service.CardInformationService;
import com.jay.domain.common.param.SearchParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.ListInformationEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * @author xxl
 * @since 2023/11/23
 */
@RestController
@RequestMapping(value = "/card",produces = "application/json;charset=UTF-8")
@RequiredArgsConstructor
@Tag(name = "歌曲列表管理控制器")
public class ListController implements ICommonController<RespEntity<?>, ListInformationEntity, SearchParam, ListInformationEntity,String> {

    private final CardInformationService cardService;

    @Override
    @PostMapping(value = "/add")
    @Operation(summary = "添加歌曲卡片")
    @ApiOperationSupport(order = 2)
    @JsonView(Param.INSERT.class)
    public RespEntity<String> insert(@RequestBody @Validated ListInformationEntity param) throws Throwable {
        return RespEntity.success(cardService.addCard(param));
    }

    @Override
    @GetMapping(value = "/delete")
    @Operation(summary = "删除歌曲卡片")
    @ApiOperationSupport(order = 3)
    public RespEntity<String> delete(@RequestParam("id") String id) throws CommonException {
        return RespEntity.success(cardService.deleteCard(id));
    }

    @Override
    @PostMapping(value = "/modify")
    @Operation(summary = "修改歌曲卡片")
    @ApiOperationSupport(order = 4)
    public RespEntity<String> update(@RequestBody @Validated ListInformationEntity param) throws Throwable {
        return RespEntity.success(cardService.modifyCard(param));
    }

    @Override
    @PostMapping(value = "/search")
    @Operation(summary = "查询歌曲卡片")
    @ApiOperationSupport(order = 5)
    public RespEntity<Page<ListInformationEntity>> query(@RequestBody SearchParam param) throws CommonException {
        return RespEntity.success("查询成功",cardService.searchCard(param));
    }
}
