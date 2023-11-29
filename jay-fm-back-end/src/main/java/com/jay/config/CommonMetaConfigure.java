package com.jay.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

/**
 * UniversalEntity自动填充字段的策略
 * @author xxl
 * @since 2023/11/9
 */
@Component
public class CommonMetaConfigure implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        //todo 入库增加
    }

    @Override
    public void updateFill(MetaObject metaObject) {

    }
}