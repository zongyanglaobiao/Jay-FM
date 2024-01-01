package com.jay.domain.song.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.io.FileMagicNumber;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.AssertUtils;
import com.jay.core.utils.CommonPageRequestUtils;
import com.jay.core.utils.FileUtils;
import com.jay.domain.common.ServicesUtil;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.song.param.AddSongInfoParam;
import com.jay.domain.song.service.SongInformationService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.SongInformationEntity;
import com.jay.repository.mapper.SongInformationMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.function.Supplier;

import static cn.hutool.core.io.FileMagicNumber.FLAC;
import static cn.hutool.core.io.FileMagicNumber.MP3;

/**
 * 歌曲控制器
 * @author: xxl
 * @since: 2023/11/22
 * @description:
 */
@Service
@Slf4j
public class SongInformationServiceImpl extends ServiceImpl<SongInformationMapper, SongInformationEntity> implements SongInformationService {

    @Value("${save-path}")
    private String songSavePath;

    @Resource
    private HttpServletResponse response;
    @Override
    public String uploadSong(AddSongInfoParam param)  {
        String fileName = null;
        try {
            SongInformationEntity one = this.lambdaQuery().
                eq(SongInformationEntity::getSongName, param.getSongName()).
                one();
            AssertUtils.isNull(one,"歌曲已存在");

            //保存歌曲
            MultipartFile file = param.getFile();
            fileName = file.getOriginalFilename();

            //检查歌曲格式
            check(fileName,MP3,FLAC);

            //保存歌曲
            String path = String.format("%s%s", songSavePath,fileName);
            String downloadPath = FileUtils.upload(file.getInputStream(),path);
            String uuid = UUID.randomUUID().toString();
            SongInformationEntity convert = Convert.convert(SongInformationEntity.class, param);
            convert.setSize(String.valueOf(file.getSize()));
            convert.setDownloadId(uuid);
            convert.setSavePath(downloadPath);
            this.save(convert);
            return uuid;
        } catch (Throwable e) {
            log.error("SongInformationServiceImpl.uploadSong抛出异常",e);
            return String.format("上传失败,文件名 = %s",fileName);
        }
    }

    @Override
    public List<String> uploadSong(List<AddSongInfoParam> param)  {
        return param.parallelStream().map(this::uploadSong).toList();
    }


    @Override
    public void downloadSong(String downloadId) throws CommonException {
        SongInformationEntity entity = this.getById(downloadId);
        AssertUtils.notNull(entity,"歌曲不存在");

        if (!entity.getEnableDownload()) {
            throw new CommonException("文件不支持下载");
        }

        FileUtils.webDownload(entity.getSavePath(),response,FileUtils.getFileName(songSavePath));
    }

    @Override
    public Page<SongInformationEntity> search(SearchParam param) throws CommonException {
        String keyword = param.getKeyword();

        //关键字为空全返回
        if (StrUtil.isBlank(keyword)) {
            return  this.page(CommonPageRequestUtils.defaultPage(),new LambdaQueryWrapper<>());
        }

        //关键词搜索
        LambdaQueryWrapper<SongInformationEntity> wrapper = ServicesUtil.keyWordSearch(keyword,
            SongInformationEntity::getSongName,
            SongInformationEntity::getSinger,
            SongInformationEntity::getLyrics,
            SongInformationEntity::getTranslatedLyrics,
            SongInformationEntity::getUploader,
            SongInformationEntity::getEmail);
        return this.page(CommonPageRequestUtils.defaultPage(),wrapper);
    }

    @Override
    public String deleteSong(String songId) throws CommonException {
        SongInformationEntity entity = this.getById(songId);
        if ( ObjectUtil.isNull(entity) || !entity.getEnableDelete()) {
            throw new  CommonException("不能被删除");
        }
        return String.valueOf(this.removeById(songId));
    }

    @Override
    public String modifySong(AddSongInfoParam param) throws CommonException {
        SongInformationEntity entity = this.getById(param.getId());
        AssertUtils.notNull(entity, "歌曲不存在");

        if (!entity.getEnableModify()) {
           throw new  CommonException("不能被修改");
        }
        BeanUtil.copyProperties(param, entity);
        this.updateById(entity);
        return "修改成功";
    }

    private void check(String songName, FileMagicNumber ...type) throws Throwable {
        for (FileMagicNumber number : type) {
            Assert.equals(number.getExtension(),FileUtils.getFileSuffix(songName), (Supplier<Throwable>) () -> new CommonException("不支持的文件格式"));
        }
    }
}




