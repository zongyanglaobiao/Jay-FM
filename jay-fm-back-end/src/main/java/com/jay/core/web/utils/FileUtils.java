package com.jay.core.web.utils;

import cn.hutool.core.io.FileUtil;
import com.jay.exception.CommonException;

import java.io.*;


/**
 * 通用文件工具类
 * @author xxl
 * @since 2023/11/23
 */
public class FileUtils {

    /**
     * 上传
     *
     * @param file     文件
     * @param savePath 保存路径
     * @return 字符串
     * @throws CommonException 使用
     */
    public static String upload(InputStream file, String savePath) throws CommonException {
        //路径不存就创建
        File touch = FileUtil.touch(new File(savePath));
        try (BufferedOutputStream writer = new BufferedOutputStream(new FileOutputStream(touch))){
            file.transferTo(writer);
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
            throw new CommonException("FileUtils：文件写出失败");
        }
        return touch.getPath();
    }

    /**
     * 下载
     *
     * @param filePath 文件路径
     * @return 字节[]
     * @throws CommonException 使用
     */
    public static byte[] download(String filePath) throws CommonException {
        //路径不存就创建
        File touch = FileUtil.touch(new File(filePath));
        if (!touch.exists()) {
            throw new CommonException(String.format("%s不存在",filePath));
        }
        try (BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream(touch))){
            return inputStream.readAllBytes();
        } catch (IOException e) {
            e.printStackTrace();
            throw new CommonException("FileUtils：文件读入失败");
        }
    }
}
