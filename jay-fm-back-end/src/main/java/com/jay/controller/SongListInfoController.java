package com.jay.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.jay.core.resp.RespEntity;
import com.jay.core.utils.AssertUtils;
import com.jay.domain.common.param.Param;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.info.service.SongInfoService;
import com.jay.domain.song.list.service.SongListInfoService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInfoEntity;
import com.jay.repository.entities.SongListInfoEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 * @author xxl
 * @since 2023/11/23
 */
@RestController
@RequestMapping(value = "/card",produces = "application/json;charset=UTF-8")
@RequiredArgsConstructor
@Validated
@Tag(name = "歌单管理控制器")
public class SongListInfoController  {

    private final SongListInfoService service;

    private final SongInfoService songInfoService;

    @PostMapping(value = "/save")
    @Operation(summary = "保存/修改")
    @ApiOperationSupport(order = 2)
    public RespEntity<String> save(@RequestBody @JsonView(Param.NOT_IGNORE.class) List<SongListInfoEntity> param){
        return RespEntity.success(String.valueOf(service.
            saveOrUpdateBatchAround(param, SongListInfoEntity::getId,(t,e)-> {
                SongListInfoEntity one = service.lambdaQuery().
                    eq(SongListInfoEntity::getName, e.getName()).one();
                if (!Objects.isNull(one)) {
                    throw  new CommonException("歌单已存在");
                }
            },null)));
    }

    @GetMapping(value = "/delete")
    @Operation(summary = "删除歌曲卡片")
    @ApiOperationSupport(order = 3)
    public RespEntity<String> delete(@RequestParam("id") List<String> id) {
        //todo 可能事务性不一致
        return RespEntity.success(String.valueOf(service.removeBatchByIds(id,t -> {
            SongListInfoEntity one = service.lambdaQuery().eq(SongListInfoEntity::getId, id).one();
            AssertUtils.notNull(one,"歌单不存在");
            if (!one.getEnableDelete()) {
                throw  new CommonException("已设置不能被删除,歌单名："+one.getName());
            }
            return true;
        })));
    }

    @PostMapping(value = "/search")
    @Operation(summary = "查询歌曲卡片")
    @ApiOperationSupport(order = 5)
    public RespEntity<Page<SongListInfoEntity>> query(@RequestBody SearchParam param) throws CommonException {
        return RespEntity.success("查询成功",service.searchCard(param));
    }

    @GetMapping(value = "/list/{listId}")
    @Operation(summary = "查询歌单中歌曲")
    @ApiOperationSupport(order = 6)
    public RespEntity<List<SongInfoEntity>> query(@PathVariable("listId") String listId)  {
        return RespEntity.success("查询成功",songInfoService.lambdaQuery().eq(SongInfoEntity::getListId,listId).list());
    }
}
