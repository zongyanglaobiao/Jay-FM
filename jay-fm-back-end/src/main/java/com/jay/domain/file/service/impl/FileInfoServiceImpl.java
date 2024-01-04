package com.jay.domain.file.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.domain.file.service.FileInfoService;
import com.jay.repository.entities.FileInfoEntity;
import com.jay.repository.mapper.FileInfoMapper;
import org.springframework.stereotype.Service;

/**
* @author xxl
* @description 针对表【file_info(歌曲列表)】的数据库操作Service实现
* @createDate 2024-01-04 17:37:27
*/
@Service
public class FileInfoServiceImpl extends ServiceImpl<FileInfoMapper, FileInfoEntity>
    implements FileInfoService {

}




