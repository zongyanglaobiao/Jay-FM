package com.jay.domain.song.service.impl;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.resp.RespEntity;
import com.jay.core.web.utils.FileUtils;
import com.jay.domain.song.param.SearchParam;
import com.jay.domain.song.param.UploadSongParam;
import com.jay.domain.song.service.SongInformationService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import com.jay.repository.mapper.SongInformationMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/**
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
@Service
public class SongInformationServiceImpl extends ServiceImpl<SongInformationMapper, SongInformationEntity> implements SongInformationService {

    @Value("${song-save-path}")
    private String songSavePath;

    @Resource
    private HttpServletResponse response;
    @Override
    public String uploadSong(UploadSongParam param) throws IOException, CommonException {
        MultipartFile file = param.getSongFile();
        String originalFilename = file.getOriginalFilename();
        String path = String.format("%s%s.%s", songSavePath,FileUtils.getFileName(originalFilename),FileUtils.getSuffix(originalFilename));
        String downloadPath = FileUtils.upload(file.getInputStream(),path);
        String uuid = UUID.randomUUID().toString();
        SongInformationEntity convert = Convert.convert(SongInformationEntity.class, param);
        convert.setDownloadId(uuid);
        convert.setSavePath(downloadPath);
        this.save(convert);
        return uuid;
    }

    @Override
    public String uploadSong(MultipartFile file) throws IOException, CommonException {
        return null;
    }

    @Override
    public void downloadSong(String downloadId) throws CommonException {
        SongInformationEntity entity = this.getById(downloadId);
        if (ObjectUtil.isNull(entity)) {
            throw new CommonException("文件不存在");
        }
        FileUtils.webDownload(entity.getSavePath(),response,FileUtils.getFileName(entity.getSavePath()));
    }

    @Override
    public RespEntity<String> search(SearchParam param) {
        return null;
    }
}




