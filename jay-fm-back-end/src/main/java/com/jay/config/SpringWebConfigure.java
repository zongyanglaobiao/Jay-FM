package com.jay.config;

import com.jay.interceptor.IPAddressInterceptor;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author xxl
 * @since 2023/11/9
 */
@Component
public class SpringWebConfigure implements WebMvcConfigurer {
    @Resource
    private IPAddressInterceptor ipAddressInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration interceptor = registry.addInterceptor(ipAddressInterceptor);
        interceptor.addPathPatterns("/**");
        //interceptor.excludePathPatterns("","");
    }
}
