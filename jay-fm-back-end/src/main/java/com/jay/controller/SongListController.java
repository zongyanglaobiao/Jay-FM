package com.jay.controller;

import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.card.list.service.SongListService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping(value = "/song/list",produces = "application/json")
@Tag(name = "歌曲列表管理控制器")
@Validated
@RequiredArgsConstructor
public class SongListController implements ICommonController<RespEntity<?>,String,String,String,String> {

    private final SongListService service;

    /*@Override
    @GetMapping(value = "/query")
    @ApiOperationSupport(order = 1)
    public RespEntity<?> query(@RequestParam String folderId) {
        return RespEntity.success(service.lambdaQuery().eq(SongListEntity::getFolderId,folderId).list());
    }*/
}
