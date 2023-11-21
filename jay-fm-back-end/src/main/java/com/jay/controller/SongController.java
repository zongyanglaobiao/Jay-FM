package com.jay.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping("/song")
@Tag(name = "歌曲管理")
public class SongController {
    @PostMapping("/upload")
    @Operation(summary = "上传歌曲")
    public void uploadSong(){

    }
}
