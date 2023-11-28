package com.jay.core.utils;

import cn.hutool.core.lang.Assert;
import com.jay.exception.CommonException;

import java.util.function.Supplier;

/**
 * @author xxl
 * @since 2023/11/29
 */
public class AssertUtils {
    public static void notNull(Object obj,String msg) throws Throwable {
        Assert.isNull(obj, (Supplier<Throwable>) () -> new CommonException(msg));
    }

    public static void isNull(Object obj,String msg) throws Throwable {
        Assert.isNull(obj, (Supplier<Throwable>) () -> new CommonException(msg));
    }
}
