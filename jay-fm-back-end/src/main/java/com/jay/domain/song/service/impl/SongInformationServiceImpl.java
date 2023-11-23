package com.jay.domain.song.service.impl;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.URLUtil;
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
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public String uploadSong(UploadSongParam param)  {
        try {
            MultipartFile songFile = param.getSongFile();
            String originalFilename = songFile.getOriginalFilename();
            //String type = FileTypeUtil.getType(originalFilename);
            return   FileUtils.upload(songFile.getInputStream(),songSavePath.concat(originalFilename));
        } catch (CommonException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void downloadSong(String downloadId) {
        try {
            byte[] download = FileUtils.download(downloadId);
            response.setHeader("Content-Disposition", "attachment;filename=" + URLUtil.encode("周杰伦 - 晴天.flac"));
            response.addHeader("Content-Length", "" + download.length);
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
            response.setContentType("application/octet-stream;charset=UTF-8");
            IoUtil.write(response.getOutputStream(), true, download);
        } catch (CommonException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public RespEntity<String> search(SearchParam param) {
        return null;
    }
}




