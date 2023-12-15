package com.jay.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.jay.core.resp.RespEntity;
import com.jay.domain.song.param.ModifySongParam;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.domain.song.service.SongInformationService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping(value = "/song",produces = "application/json")
@Tag(name = "歌曲管理控制器")
@Validated
@RequiredArgsConstructor
public class SongController  {

    private final SongInformationService service;

    @PostMapping(value = "/addCardInfo")
    @Operation(summary = "上传歌曲")
    @ApiOperationSupport(order = 1)
    public RespEntity<String> addCardInfo(@ModelAttribute @Validated UploadSongParam param) throws Throwable {
        return RespEntity.success(service.uploadSong(param));
    }

    @GetMapping("/download")
    @Operation(summary = "下载歌曲")
    @ApiOperationSupport(order = 2)
    public void downloadSong(@RequestParam("id") String downloadId) throws Throwable {
        service.downloadSong(downloadId);
    }

    @PostMapping("/modify")
    @Operation(summary = "修改歌曲")
    @ApiOperationSupport(order = 3)
    public RespEntity<String> modifySong(@RequestBody ModifySongParam param) throws Throwable {
        return RespEntity.success(service.modifySong(param));
    }

    @GetMapping("/delete")
    @Operation(summary = "删除歌曲")
    @ApiOperationSupport(order = 4)
    public RespEntity<String> deleteSong(@RequestParam("id") @NotBlank(message = "歌曲id不能为空" ) String songId){
        return RespEntity.success(service.deleteSong(songId));
    }

    @PostMapping("/search")
    @Operation(summary = "搜索歌曲")
    @ApiOperationSupport(order = 5)
    public RespEntity<Page<SongInformationEntity>> search(@RequestBody SearchParam param) throws CommonException {
        return RespEntity.success("查询成功",service.search(param));
    }
}
