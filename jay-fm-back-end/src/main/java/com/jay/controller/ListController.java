package com.jay.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.card.info.service.CardInformationService;
import com.jay.domain.common.param.Param;
import com.jay.domain.common.param.SearchParam;
import com.jay.exception.CommonException;
import com.jay.repository.entities.ListInformationEntity;
import com.jay.repository.entities.SongInformationEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author xxl
 * @since 2023/11/23
 */
@RestController
@RequestMapping(value = "/card",produces = "application/json;charset=UTF-8")
@RequiredArgsConstructor
@Validated
@Tag(name = "歌曲列表管理控制器")
public class ListController  {

    private final CardInformationService cardService;

    @PostMapping(value = "/add")
    @Operation(summary = "添加歌曲卡片")
    @ApiOperationSupport(order = 2)
    public RespEntity<String> insert(@RequestBody  @JsonView(Param.INSERT.class) ListInformationEntity param) throws Throwable {
        return RespEntity.success(cardService.addCard(param));
    }

    @GetMapping(value = "/delete")
    @Operation(summary = "删除歌曲卡片")
    @ApiOperationSupport(order = 3)
    public RespEntity<String> delete(@RequestParam("id") @NotBlank(message = "歌单ID不能为空") String id) throws CommonException {
        return RespEntity.success(cardService.deleteCard(id));
    }

    @PostMapping(value = "/modify")
    @Operation(summary = "修改歌曲卡片")
    @ApiOperationSupport(order = 4)
    public RespEntity<String> update(@RequestBody @Validated(Param.UPDATE.class) @JsonView(Param.UPDATE.class) ListInformationEntity param) throws Throwable {
        return RespEntity.success(cardService.modifyCard(param));
    }

    @PostMapping(value = "/search")
    @Operation(summary = "查询歌曲卡片")
    @ApiOperationSupport(order = 5)
    public RespEntity<Page<ListInformationEntity>> query(@RequestBody SearchParam param) throws CommonException {
        return RespEntity.success("查询成功",cardService.searchCard(param));
    }

    @GetMapping(value = "/songs/{folderId}")
    @Operation(summary = "查询歌曲卡片")
    @ApiOperationSupport(order = 6)
    public RespEntity<List<SongInformationEntity>> query(@PathVariable("folderId") String folderId)  {
        return RespEntity.success("查询成功",cardService.getSongs(folderId));
    }
}
