package com.jay.domain.common;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author xxl
 * @since 2023/12/13
 */
public interface ICommonService<T> extends IService<T> {
    LambdaQueryWrapper<T> getWrapper();
}
