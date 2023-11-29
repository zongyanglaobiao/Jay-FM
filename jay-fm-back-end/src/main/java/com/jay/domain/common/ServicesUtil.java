package com.jay.domain.common;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;

/**
 * service层工具类
 * @author xxl
 * @since 2023/11/29
 */
public class ServicesUtil {

    @SafeVarargs
    public static <T>  LambdaQueryWrapper<T> keyWordSearch(String keyword, SFunction<T,?> ...condition) {
        LambdaQueryWrapper<T> wrapper = Wrappers.<T>lambdaQuery();
        for (SFunction<T,?> function : condition) {
            wrapper
                .like(function,keyword)
                .or();
        }
        return wrapper;
    }
}
