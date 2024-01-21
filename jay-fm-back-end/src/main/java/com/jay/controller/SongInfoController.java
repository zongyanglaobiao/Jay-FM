package com.jay.controller;

import cn.hutool.core.io.FileUtil;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.jay.core.resp.RespEntity;
import com.jay.domain.common.param.Param;
import com.jay.domain.file.service.FileInfoService;
import com.jay.domain.song.info.service.SongInfoService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.FileInfoEntity;
import com.jay.repository.entities.SongInfoEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping(value = "/song",produces = "application/json")
@Tag(name = "歌曲控制器")
@Validated
@Slf4j
@RequiredArgsConstructor
public class SongInfoController  {

    private final SongInfoService service;

    private final FileInfoService fileInfoService;

    private final ThreadPoolExecutor executor;


    @PostMapping(value = "/save")
    @Operation(summary = "新增")
    @ApiOperationSupport(order = 1)
    public RespEntity<String> save(@RequestPart @JsonView(Param.INSERT.class) @Validated(Param.INSERT.class) SongInfoEntity param ,
                                   @RequestParam("file") @NotNull(message = "歌曲文件不能为空") MultipartFile file){
        return RespEntity.success(service.save(param,file));
    }

    @GetMapping("/download")
    @Operation(summary = "下载歌曲")
    @ApiOperationSupport(order = 2)
    public void downloadSong(@RequestParam("id") String downloadId)  {
        service.downloadSong(downloadId);
    }

    @PostMapping(value = "/modify")
    @Operation(summary = "修改")
    @ApiOperationSupport(order = 2)
    public RespEntity<String> modify(@RequestBody @JsonView(Param.UPDATE.class) @Validated(Param.UPDATE.class) @Valid SongInfoEntity param) {
        return RespEntity.success(service.modify(param));
    }

    @GetMapping("/delete")
    @Operation(summary = "删除歌曲")
    @ApiOperationSupport(order = 4)
    public RespEntity<String> deleteSong(@RequestParam @NotBlank(message = "歌曲ID不能为空" ) String songId) throws CommonException {
        return RespEntity.success(String.valueOf(service.removeBatchByIdsBefore(List.of(songId), t -> {
            SongInfoEntity entity = service.getById(songId);
            if (Objects.isNull(entity)) {
                throw new CommonException("歌曲不存在");
            }

            //设置歌曲文件不可用
            FileInfoEntity byId = fileInfoService.getById(entity.getDownloadId());
            byId.setHasUsed(false);
            fileInfoService.saveOrUpdate(byId,FileInfoEntity::getId);

            //删除文件
            executor.execute(() -> {
                String path = byId.getSavePath();
                try {
                    FileUtil.del(path);
                } catch (Exception e) {
                    log.error("歌曲文件删除失败 path = " + path);
                    throw new CommonException("歌曲文件删除失败");
                }
            });

            return true;
        })));
    }
}
