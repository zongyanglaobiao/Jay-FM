package com.jay.core.utils;

import cn.hutool.core.lang.Assert;
import com.jay.exception.CommonException;

/**
 * @author xxl
 * @since 2023/11/29
 */
public class AssertUtils {
    public static void notNull(Object obj,String msg) throws CommonException {
        Assert.notNull(obj, () -> new CommonException(msg));
    }

    public static void isNull(Object obj,String msg) throws CommonException {
        Assert.isNull(obj, () -> new CommonException(msg));
    }

    /**
     * true就放行
     * @param condition
     * @param msg
     * @throws CommonException
     */
    public static void isTure(boolean condition,String msg) throws CommonException {
        if (!condition) {
            throw new CommonException(msg);
        }
    }
}
