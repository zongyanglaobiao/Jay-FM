package com.jay.controller;

import com.jay.domain.ip.service.IPAddressService;
import com.jay.domain.users.services.TestService;
import com.jay.repository.entities.IPAddressEntity;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author xxl
 * @since 2023/11/4
 */
@RestController
@Slf4j
@Tag(name = "测试控制器")
public class TestController {
    @Resource
    private IPAddressService  service;
    @GetMapping("/test")
    public List<IPAddressEntity> test(){
        return service.list();
    }

}
