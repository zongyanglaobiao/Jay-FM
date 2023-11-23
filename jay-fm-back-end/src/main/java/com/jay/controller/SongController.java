package com.jay.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import com.github.xiaoymin.knife4j.annotations.DynamicParameter;
import com.jay.core.resp.RespEntity;
import com.jay.domain.song.param.ModifySongParam;
import com.jay.domain.song.param.SearchParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.domain.song.service.SongInformationService;
import com.jay.repository.entities.SongInformationEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping("/song")
@Tag(name = "歌曲管理控制器")
public class SongController  {

    @Resource
    private SongInformationService service;

    @PostMapping("/upload")
    @Operation(summary = "上传歌曲")
    public RespEntity<String> uploadSong(@RequestPart("file") MultipartFile file){
        UploadSongParam param = new UploadSongParam();
        param.setSongFile(file);
        param.setName("周杰伦");
        return RespEntity.success(service.uploadSong(param));
    }

    @GetMapping("/download")
    @Operation(summary = "下载歌曲")
    public void downloadSong(@RequestParam("id") String downloadId){
        service.downloadSong(downloadId);
    }

    @PostMapping("/modify")
    @Operation(summary = "修改歌曲")
    public RespEntity<String> modifySong(@RequestBody ModifySongParam param){
        SongInformationEntity entity = service.getById(param.getId());
        if (ObjectUtil.isNull(entity)) {
            return RespEntity.fail("歌曲不存在");
        }
        BeanUtil.copyProperties(param, entity);
        service.updateById(entity);
        return RespEntity.success();
    }

    @GetMapping("/modify")
    @Operation(summary = "删除歌曲")
    public RespEntity<String> deleteSong(@RequestParam("id") String songId){
        service.removeById(songId);
        return RespEntity.success();
    }

    @PostMapping("/search")
    @Operation(summary = "搜索歌曲")
    public RespEntity<String> search(@RequestBody SearchParam param){
        return service.search(param);
    }
}
