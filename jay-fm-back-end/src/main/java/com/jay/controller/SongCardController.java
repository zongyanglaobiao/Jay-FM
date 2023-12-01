package com.jay.controller;

import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
