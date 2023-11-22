package com.jay.controller;

import com.jay.core.resp.RespEntity;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.domain.song.service.SongInformationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping("/song")
@Tag(name = "歌曲管理")
public class SongController {

    @Resource
    private SongInformationService service;

    @PostMapping("/upload")
    @Operation(summary = "上传歌曲")
    public RespEntity<String> uploadSong(@ModelAttribute("param") UploadSongParam param){
        return service.uploadSong(param);
    }

    @GetMapping("/download")
    @Operation(summary = "下载歌曲")
    public RespEntity<String> downloadSong(@RequestParam("id") String downloadId){
        return service.downloadSong(downloadId);
    }

    @GetMapping("/modify")
    @Operation(summary = "修改歌曲")
    public RespEntity<String> modifySong(@RequestParam("id") String downloadId){
        return service.downloadSong(downloadId);
    }

    @GetMapping("/modify")
    @Operation(summary = "删除歌曲")
    public RespEntity<String> deleteSong(@RequestParam("id") String downloadId){
        return service.downloadSong(downloadId);
    }
}
