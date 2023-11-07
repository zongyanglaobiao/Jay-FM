package com.jay.domain.users.services.impl;

import org.springframework.stereotype.Service;

/**
 * @author xxl
 * @since 2023/11/6
 */
@Service
public class TestService2Impl extends TestServiceImpl {
    @Override
    public String test() {
        return "我继承了TestServiceImpl";
    }
}
