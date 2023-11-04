package com.jay.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @author xxl
 * @since 2023/11/4
 */
@RestController
@Slf4j
@Tag(name = "测试控制器")
public class TestController {
    @GetMapping("/test")
    public String test(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();
        log.error(request.getRequestURI());
        System.out.println(1/0);
        return "测试";
    }
}
