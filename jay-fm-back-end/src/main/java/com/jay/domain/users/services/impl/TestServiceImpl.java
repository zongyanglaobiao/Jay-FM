package com.jay.domain.users.services.impl;

import com.jay.domain.users.services.TestService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

/**
 * @author xxl
 * @since 2023/11/6
 */
@Service
@Primary
public class TestServiceImpl implements TestService {

    @Override
    public String test() {
        return "我是TestService实现类1";
    }
}
