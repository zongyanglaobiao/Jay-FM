package com.jay.interceptor;


import cn.hutool.core.convert.Convert;
import com.jay.core.redis.RedisUtils;
import com.jay.domain.ip.service.IPAddressService;
import com.jay.repository.entities.IPAddressEntity;
import com.jay.utils.IPUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * 最外层的拦截器
 * @author xxl
 * @since 2023/11/9
 */
@Component
@Slf4j
public class IPAddressInterceptor implements HandlerInterceptor {
    @Resource
    private IPAddressService service;

    @Resource
    private IPUtils ipUtils;

    @Resource
    private RedisUtils redisUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = ipUtils.getIp(request);
        String city = ipUtils.getCity(ip);

        //因为请求可能过于频繁，所以先存储在redis中
        if (!redisUtils.hasKey(ip)) {
            log.info("ip = {},city = {}",ip,city);
            IPAddressEntity entity = new IPAddressEntity();
            entity.setIp(ip);
            entity.setAddress(city);
            service.save(entity);
            redisUtils.opsForValue(ip,entity);
            return HandlerInterceptor.super.preHandle(request, response, handler);
        }

        IPAddressEntity convert = redisUtils.get(ip, IPAddressEntity.class);
        if (convert.isDisable()) {
            //被禁用IP
            return false;
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
