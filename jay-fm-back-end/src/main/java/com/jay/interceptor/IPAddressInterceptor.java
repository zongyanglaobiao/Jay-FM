package com.jay.interceptor;


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
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = ipUtils.getIp(request);
        log.info("ip:{},address:{}",ip ,ipUtils.getCity(ip));

        service.getById(ip)

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }





}
