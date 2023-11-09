package com.jay.controller;

import com.jay.domain.users.services.TestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xxl
 * @since 2023/11/4
 */
@RestController
@Slf4j
@Tag(name = "测试控制器")
public class TestController {
    @Resource
    private TestService service;
    @GetMapping("/test")
    public String test(){
        return service.test();
    }
}
