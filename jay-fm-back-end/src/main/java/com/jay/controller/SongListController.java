package com.jay.controller;

import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.card.list.service.SongListService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongListEntity;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @Override
    @GetMapping(value = "/query")
    @ApiOperationSupport(order = 1)
    public RespEntity<?> query(@RequestParam("folderId") String folderId) {
        return RespEntity.success(service.list(service.getWrapper().eq(SongListEntity::getFolderId,folderId)));
    }
}
