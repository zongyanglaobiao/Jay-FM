package com.jay.config;

import com.jay.interceptor.AuthInterceptor;
import com.jay.interceptor.IPAddressInterceptor;
import jakarta.annotation.Resource;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

/**
 * @author xxl
 * @since 2023/11/9
 */
@Configuration
@ConfigurationProperties(prefix = "auth-path")
@Slf4j
public class SpringWebConfigure implements WebMvcConfigurer {
    private static final String PATH = "/**";

    @Getter
    @Setter
    private String[] exclude;

    @Resource
    private IPAddressInterceptor ipAddressInterceptor;

    @Resource
    private AuthInterceptor  authInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration interceptor = registry.addInterceptor(ipAddressInterceptor);
        interceptor.addPathPatterns(PATH);
        InterceptorRegistration authInterceptorRegistration = registry.addInterceptor(authInterceptor);
        authInterceptorRegistration.addPathPatterns(PATH);
        authInterceptorRegistration.excludePathPatterns(exclude);
    }
}
