package com.jay.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.card.service.SongCardService;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.param.ModifySongParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.domain.song.service.SongInformationService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * @author xxl
 * @since 2023/11/19
 */
@RestController
@RequestMapping(value = "/song/management",produces = "application/json")
@Tag(name = "卡片歌曲管理控制器")
@Validated
public class SongCardController implements ICommonController<RespEntity<?>,String,String,String,String> {
}
