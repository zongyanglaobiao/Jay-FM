package com.jay.utils;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.lionsoul.ip2region.xdb.Searcher;

import java.io.File;
import java.io.InputStream;

import static cn.hutool.core.text.StrPool.DOT;
import static com.baomidou.mybatisplus.core.toolkit.StringPool.EMPTY;

/**
 * IP工具类
 * @author xxl
 * @since 2023/11/9
 */
@Slf4j
public class IPUtils {
    /**
     * 过滤本地地址
     */
    public static final String LOCAL_ADDRESS = "127.0.0.1";
    public static final String LOOP_BACK_ADDRESS = "0:0:0:0:0:0:0:1";
    /**
     * 离线查询IP地址的数据文件
     */
    private static final String IP_ADDRESS_FILE_PATH ;

    /**
     * 前从 xdb 文件中加载出来 VectorIndex 数据，然后全局缓存，
     * 每次创建 Searcher 对象的时候使用全局的 VectorIndex 缓存可以减少一次固定的 IO 操作，
     * 从而加速查询，减少 IO 压力。
     */
    private static final byte[] V_INDEX;
    private static final Searcher SEARCHER;

    static {
        try {
            String fileName = "/data/ip2region.xdb";
            File existFile = FileUtil.file(FileUtil.getTmpDir() + FileUtil.FILE_SEPARATOR + fileName);
            if(!FileUtil.exist(existFile)) {
                InputStream resourceAsStream = IPUtils.class.getResourceAsStream(fileName);
                FileUtil.writeFromStream(resourceAsStream, existFile);
            }

            IP_ADDRESS_FILE_PATH = existFile.getPath();

            // 从 db 中预先加载 VectorIndex 缓存，并且把这个得到的数据作为全局变量，后续反复使用。
            V_INDEX = Searcher.loadVectorIndexFromFile(IP_ADDRESS_FILE_PATH);
            // 使用全局的 vIndex 创建带 VectorIndex 缓存的查询对象。
            SEARCHER = Searcher.newWithVectorIndex(IP_ADDRESS_FILE_PATH,V_INDEX);
        } catch (Exception e) {
            throw new RuntimeException("IPUtils class load error", e);
        }
    }

    /**
     * 每个线程需要单独创建一个独立的 Searcher 对象，但是都共享全局的制度 vIndex 缓存。
     * @param ip IP
     * @return IP地址
     */
    public static String getCity(String ip)  {
        String search = null;
        try {
            search = SEARCHER.search(ip);
        } catch (Exception e) {
            log.error("getCity fail",e);
        }
        return search;
    }

    /**
     * 获取 IP
     *
     * @param request 请求
     * @return 字符串
     */
    public static String getIp(HttpServletRequest request) {
        String ip = null;
        try {
            //解析IP
            ip = new ChainUtils<>(request.getHeader("X-Forwarded-For"))
                //多次反向代理后会有多个ip值，第一个ip才是真实ip
                .chain(re -> StrUtil.isNotBlank(re) ? (re.contains(DOT) ? re.substring(0, re.indexOf(DOT)) : EMPTY) : re)
                //依次查找IP
                .chain(re -> StrUtil.isNotBlank(re) ? re : request.getHeader("X-Real-IP"))
                .chain(re -> StrUtil.isNotBlank(re) ? re : request.getHeader("Proxy-Client-IP"))
                .chain(re -> StrUtil.isNotBlank(re) ? re : request.getHeader("WL-Proxy-Client-IP"))
                .chain(re -> StrUtil.isNotBlank(re) ? re : request.getHeader("HTTP_CLIENT_IP"))
                .chain(re -> StrUtil.isNotBlank(re) ? re : request.getHeader("HTTP_X_FORWARDED_FOR"))
                .chain(re -> StrUtil.isNotBlank(re) ? re : request.getRemoteAddr())
                //过滤本地地址
                .chain(re -> StrUtil.isNotBlank(re) ? (LOOP_BACK_ADDRESS.equals(re) ? LOCAL_ADDRESS : re) : re)
                .getValue(true);
        } catch (Exception e) {
            log.error("getIp fail", e);
        }
        return ip;
    }
}
