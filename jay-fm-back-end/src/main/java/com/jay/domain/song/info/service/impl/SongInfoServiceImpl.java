package com.jay.domain.song.info.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.io.FileMagicNumber;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.lang.Assert;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jay.core.utils.AssertUtils;
import com.jay.core.utils.FileUtils;
import com.jay.domain.file.service.FileInfoService;
import com.jay.domain.song.info.service.SongInfoService;
import com.jay.exception.CommonException;
import com.jay.repository.common.CommonEntity;
import com.jay.repository.entities.FileInfoEntity;
import com.jay.repository.entities.SongInfoEntity;
import com.jay.repository.mapper.SongInfoMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ThreadPoolExecutor;

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

    private final ThreadPoolExecutor executor;

    @Override
    public void downloadSong(String id) throws CommonException {
        SongInfoEntity entity = this.getById(id);
        AssertUtils.notNull(entity,"歌曲不存在");

        if (Objects.equals(entity.getEnableDownload(), CommonEntity.Enable.DISABLE)) {
            throw new CommonException("文件不支持下载");
        }

        FileInfoEntity one = fileInfoService.lambdaQuery().eq(FileInfoEntity::getId, entity.getDownloadId()).one();
        FileUtils.webDownload(one.getSavePath(),response,FileUtils.getFileName(songSavePath));
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public String deleteSong(List<String> songIds) {
        return this.deleteSong(songIds,false);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public String deleteSong(List<String> songIds, boolean isDeleteList) {
        return String.valueOf(this.removeBatchByIdsBefore(songIds, t -> {
            SongInfoEntity entity = this.getById(t);

            if (Objects.isNull(entity)) {
                throw new CommonException("歌曲不存在");
            }

            if (Objects.equals(entity.getEnableDelete(), CommonEntity.Enable.DISABLE) && !isDeleteList) {
                throw new CommonException("歌曲已设置不允许删除");
            }

            //设置歌曲文件不可用
            FileInfoEntity byId = fileInfoService.getById(entity.getDownloadId());
            byId.setHasUsed(CommonEntity.Enable.DISABLE);
            fileInfoService.saveOrUpdate(byId,FileInfoEntity::getId);

            //删除文件
            executor.execute(() -> {
                String path = byId.getSavePath();
                try {
                    boolean del = FileUtil.del(path);
                    log.info("删除成功,path = {},isSuccess = {}",path,del);
                } catch (Exception e) {
                    log.error("歌曲文件删除失败 path = {}",path);
                    throw new CommonException("歌曲文件删除失败");
                }
            });

            return true;
        }));
    }

    private void check(String songName, FileMagicNumber ...type)  {
        boolean match = Arrays.stream(type).anyMatch(t -> t.getExtension().equalsIgnoreCase(FileUtils.getFileSuffix(songName)));
        AssertUtils.assertTrue(match,"不支持的文件格式 = {}"+FileUtils.getFileSuffix(songName));
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

            //保存文件信息到数据库
            FileInfoEntity entity = new FileInfoEntity();
            entity.setSize(file.getSize());
            entity.setSavePath(downloadPath);
            fileInfoService.save(entity);
            uuid = entity.getId();
        } catch (IOException e) {
            log.error("SongInformationServiceImpl.save抛出异常",e);
            throw new CommonException("文件保存失败，文件名" + fileName);
        }

        param.setDownloadId(uuid);
        return String.valueOf(this.save(param));
    }

    @Override
    public String modify(SongInfoEntity param) {
        SongInfoEntity byId = this.getById(param.getId());
        AssertUtils.notNull(byId,"歌曲不存在");

        if (Objects.equals(byId.getEnableModify(), CommonEntity.Enable.DISABLE)) {
            throw new CommonException("已设置不能修改");
        }

        BeanUtil.copyProperties(param,byId);
        this.updateById(byId);
        return null;
    }
}




