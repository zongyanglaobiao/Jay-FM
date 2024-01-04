package com.jay.domain.song.info.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.io.FileMagicNumber;
import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.AssertUtils;
import com.jay.core.utils.CommonPageRequestUtils;
import com.jay.core.utils.FileUtils;
import com.jay.domain.card.list.service.SongListService;
import com.jay.domain.common.ServicesUtil;
import com.jay.domain.common.param.SearchParam;
import com.jay.domain.file.service.FileInfoService;
import com.jay.domain.song.info.param.ModifySongInfoParam;
import com.jay.domain.song.info.param.AddSongInfoParam;
import com.jay.domain.song.info.service.SongInfoService;
import com.jay.domain.song.info.service.SongInformationService;
import com.jay.exception.CommonException;
import com.jay.repository.entities.FileInfoEntity;
import com.jay.repository.entities.SongInfoEntity;
import com.jay.repository.entities.SongInformationEntity;
import com.jay.repository.mapper.SongInfoMapper;
import com.jay.repository.mapper.SongInformationMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

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
@RequiredArgsConstructor
public class SongInfoServiceImpl extends ServiceImpl<SongInfoMapper, SongInfoEntity> implements SongInfoService {

    @Value("${save-path}")
    private String songSavePath;

    private final HttpServletResponse response;

    private final FileInfoService fileInfoService;

    public boolean uploadSong(AddSongInfoParam param) throws CommonException {
        String fileName = null;
        try {
            //保存歌曲
            MultipartFile file = param.getSongFile();
            fileName = file.getOriginalFilename();

            //检查歌曲格式
            check(fileName,MP3,FLAC);

            //保存歌曲
            String path = String.format("%s%s", songSavePath,fileName);
            String downloadPath = FileUtils.upload(file.getInputStream(),path);
            String uuid = UUID.randomUUID().toString();
            SongIn convert = Convert.convert(SongInformationEntity.class, param);
            convert.setSize(String.valueOf(file.getSize()));
            convert.setDownloadId(uuid);
            convert.setSavePath(downloadPath);
            boolean save = this.save(convert);

            //把存储歌曲到指定文件夹
            SongListEntity entity = new SongListEntity();
            entity.setFolderId(param.getFolderId());
            entity.setSongId(convert.getId());
            songListService.save(entity);

            return save;
        } catch (Exception e) {
            log.error("SongInformationServiceImpl.uploadSong抛出异常",e);
            throw new CommonException(String.format("上传失败,文件名 = %s",fileName));
        }
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
    @Transactional(rollbackFor = RuntimeException.class)
    public String deleteSong(String songId) throws CommonException {
        SongInformationEntity entity = this.getById(songId);
        if ( ObjectUtil.isNull(entity) || !entity.getEnableDelete()) {
            throw new  CommonException("不能被删除");
        }

        songListService.remove(Wrappers.<SongListEntity>lambdaQuery().eq(SongListEntity::getSongId,songId));
        return String.valueOf(this.removeById(songId));
    }

    @Override
    public String add(List<AddSongInfoParam> param) {
        return String.valueOf(param.parallelStream().allMatch(t -> {
            try {
                return  this.uploadSong(t);
            } catch (CommonException e) {
                throw new RuntimeException(e.getMsg());
            }
        }));
    }


    @Override
    public String modify(ModifySongInfoParam param) throws CommonException {
        SongInformationEntity entity = this.getById(param.getId());
        AssertUtils.notNull(entity,"歌曲不存在");

        SongInformationEntity convert = Convert.convert(SongInformationEntity.class, param);
        BeanUtil.copyProperties(convert,entity);
        //更新
        return String.valueOf(this.updateById(entity));
    }

    private void check(String songName, FileMagicNumber ...type) throws CommonException {
        for (FileMagicNumber number : type) {
            Assert.equals(number.getExtension(),FileUtils.getFileSuffix(songName), () -> new CommonException("不支持的文件格式"));
        }
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public String save(SongInfoEntity param, MultipartFile file) {
        String fileName = null;
        String downloadPath = null;
        String uuid = null;
        try {
            //保存歌曲文件
            fileName = file.getOriginalFilename();

            //检查歌曲格式
            check(fileName,MP3,FLAC);

            String path = String.format("%s%s", songSavePath,fileName);
            downloadPath = FileUtils.upload(file.getInputStream(),path);
            uuid = UUID.randomUUID().toString();

            //保存文件信息到数据库
            FileInfoEntity entity = new FileInfoEntity();
            entity.setSize(file.getSize());
            entity.setSavePath(downloadPath);
            fileInfoService.save(entity);
        } catch (IOException e) {
            log.error("SongInformationServiceImpl.save抛出异常",e);
            throw new CommonException("文件保存失败，文件名" + fileName);
        }

        param.setDownloadId(uuid);
        this.save(param);
        return null;
    }

    @Override
    public String modify(SongInfoEntity param) {
        SongInfoEntity byId = this.getById(param.getId());
        AssertUtils.notNull(byId,"歌曲不存在");

        if (!byId.getEnableModify()) {
            throw new CommonException("已设置不能修改");
        }

        BeanUtil.copyProperties(param,byId);
        this.updateById(byId);
        return null;
    }
}




