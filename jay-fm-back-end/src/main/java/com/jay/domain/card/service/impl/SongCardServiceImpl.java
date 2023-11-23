package com.jay.domain.card.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.domain.card.service.SongCardService;
import com.jay.repository.entities.SongCardEntity;
import com.jay.repository.mapper.SongCardMapper;
import org.springframework.stereotype.Service;

/**
* @author xxl
* @description 针对表【song_in_folder(中间表)】的数据库操作Service实现
* @createDate 2023-11-23 20:17:29
*/
@Service
public class SongCardServiceImpl extends ServiceImpl<SongCardMapper, SongCardEntity> implements SongCardService {

}




