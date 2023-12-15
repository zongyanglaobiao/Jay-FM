package com.jay.controller;

import com.jay.domain.ip.service.IPAddressService;
import com.jay.repository.entities.IPAddressEntity;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ConcurrentMap;

/**
 * @author xxl
 * @since 2023/11/4
 */
@RestController
@Slf4j
@Tag(name = "测试控制器")
public class TestController {
    public static final ConcurrentMap<String,SseEmitter> pool = new java.util.concurrent.ConcurrentHashMap<>();

    @Resource
    private IPAddressService  service;
    @GetMapping("/test")
    public List<IPAddressEntity> test(){
        return service.list();
    }


    @GetMapping("/subscribe/{id}")
    public SseEmitter subscribe(@PathVariable("id") String id) {
        SseEmitter sseEmitter = pool.get(id);
        if (Objects.isNull(sseEmitter)) {
            SseEmitter emitter = new SseEmitter();
            pool.put(id, emitter);
            return emitter;
        }
        return sseEmitter;
    }

    @GetMapping("/push/{id}")
    public void push(@PathVariable("id") String id, @RequestParam("text") String text) throws IOException {
        SseEmitter sseEmitter = pool.get(id);
        if (Objects.isNull(sseEmitter)) {
            return;
        }
        sseEmitter.send(text);
        sseEmitter.complete();
    }
}
