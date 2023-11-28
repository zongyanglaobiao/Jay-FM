package com.jay.domain.song.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.io.FileMagicNumber;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.AssertUtils;
import com.jay.core.utils.CommonPageRequestUtils;
import com.jay.core.utils.FileUtils;
import com.jay.domain.song.param.ModifySongParam;
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

import java.util.UUID;
import java.util.function.Supplier;

import static cn.hutool.core.io.FileMagicNumber.MP3;

/**
 * 歌曲控制器
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
    public String uploadSong(UploadSongParam param) throws Throwable {
        SongInformationEntity one = this.getOne(Wrappers.<SongInformationEntity>lambdaQuery().eq(SongInformationEntity::getSongName, param.getSongName()));
        AssertUtils.notNull(one,"歌曲已存在");

        //保存歌曲
        MultipartFile file = param.getSongFile();
        String originalFilename = file.getOriginalFilename();

        //检查歌曲格式
        check(originalFilename,MP3);

        //保存歌曲
        String path = String.format("%s%s", songSavePath,originalFilename);
        String downloadPath = FileUtils.upload(file.getInputStream(),path);
        String uuid = UUID.randomUUID().toString();
        SongInformationEntity convert = Convert.convert(SongInformationEntity.class, param);
        convert.setSize(String.valueOf(file.getSize()));
        convert.setDownloadId(uuid);
        convert.setSavePath(downloadPath);
        this.save(convert);
        return uuid;
    }


    @Override
    public void downloadSong(String downloadId) throws Throwable {
        SongInformationEntity entity = this.getById(downloadId);
        AssertUtils.isNull(entity,"文件不存在");
        if (!entity.getEnableDownload()) {
            throw new CommonException("文件不支持下载");
        }

        FileUtils.webDownload(entity.getSavePath(),response,FileUtils.getFileName(songSavePath));
    }

    @Override
    public Page<SongInformationEntity> search(SearchParam param) throws CommonException {
        String keyword = param.getKeyword();
        LambdaQueryWrapper<SongInformationEntity> wrapper = Wrappers.lambdaQuery();

        //关键字为空全返回
        if (ObjectUtil.isNull(keyword)) {
            return  this.page(CommonPageRequestUtils.defaultPage(),wrapper);
        }

        //关键词搜索
        wrapper.like(SongInformationEntity::getSongName, keyword).
            or().
            like(SongInformationEntity::getSinger, keyword).
            or().
            like(SongInformationEntity::getLyrics, keyword).
            or().
            like(SongInformationEntity::getTranslatedLyrics, keyword);
        return this.page(CommonPageRequestUtils.defaultPage(),wrapper);
    }

    @Override
    public String deleteSong(String songId) {
        SongInformationEntity entity = this.getById(songId);
        if (!entity.getEnableDelete()) {
            return "不能被删除";
        }
        return "删除成功";
    }

    @Override
    public String modifySong(ModifySongParam param) throws Throwable {
        SongInformationEntity entity = this.getById(param.getId());
        AssertUtils.isNull(entity, "歌曲不存在");
        if (!entity.getEnableModify()) {
            return "不允许修改";
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




