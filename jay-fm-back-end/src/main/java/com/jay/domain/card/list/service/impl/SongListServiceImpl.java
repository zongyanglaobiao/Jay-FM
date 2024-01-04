package com.jay.domain.card.list.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.domain.card.list.service.SongListService;
import com.jay.repository.mapper.SongListMapper;
import org.springframework.stereotype.Service;

/**
* @author xxl
* @description 针对表【song_list(歌曲列表)】的数据库操作Service实现
* @createDate 2023-12-13 23:52:10
*/
@Service
public class SongListServiceImpl extends ServiceImpl<SongListMapper, SongListEntity>
    implements SongListService {
}




