package com.jay.interceptor;


import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.jay.core.redis.RedisUtils;
import com.jay.domain.ip.service.IPAddressService;
import com.jay.repository.common.CommonEntity;
import com.jay.repository.entities.IPAddressEntity;
import com.jay.utils.IPUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Objects;

/**
 * 最外层的拦截器
 * @author xxl
 * @since 2023/11/9
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class IPAddressInterceptor implements HandlerInterceptor {

    private final IPAddressService service;

    private final IPUtils ipUtils;

    private final RedisUtils redisUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = ipUtils.getIp(request);
        String city = ipUtils.getCity(ip);

        IPAddressEntity one = null;
        //因为请求可能过于频繁，所以先存储在redis中
        if (!redisUtils.hasKey(ip) && ObjectUtil.isNull(one = service.getOne(Wrappers.<IPAddressEntity>lambdaQuery().eq(IPAddressEntity::getIp, ip)))) {
            log.info("ip = {},city = {}",ip,city);
            IPAddressEntity entity = new IPAddressEntity();
            entity.setDisable(CommonEntity.Enable.ENABLE);
            entity.setIp(ip);
            entity.setAddress(city);
            service.save(entity);
            redisUtils.opsForValue(ip,entity);
            return HandlerInterceptor.super.preHandle(request, response, handler);
        }

        //走到这里标识redis存储过期
        if (ObjectUtil.isNotNull(one)) {
            redisUtils.opsForValue(ip,one);
        }

        IPAddressEntity convert = redisUtils.get(ip, IPAddressEntity.class);
        if (Objects.equals(convert.getDisable(), CommonEntity.Enable.DISABLE)) {
            response.getWriter().write("""
            <div style='width:  100%;height: 100%;display: flex;justify-content: center;align-items: center;'>
            <h1>您的IP被禁止访问</h1>
            </div>
            """);
            //IP被禁用
            return false;
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
