package com.jay.controller;

import com.jay.core.resp.RespEntity;
import com.jay.core.web.common.ICommonController;
import com.jay.domain.card.service.CardInformationService;
import com.jay.domain.card.service.SongCardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xxl
 * @since 2023/11/23
 */
@Tag(name = "歌曲卡片管理控制器")
@RestController
@RequestMapping("/song/management")
public class CardController implements ICommonController<RespEntity<?>,Object,Object,Object,Object> {

    @Resource
    private SongCardService service;

    @Resource
    private CardInformationService folderService;
}
