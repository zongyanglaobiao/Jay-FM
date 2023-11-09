package com.jay.utils;

import cn.hutool.core.lang.Assert;
import lombok.AllArgsConstructor;

import java.util.function.Function;

/**
 * @author: xxl
 * @since: 2023/11/9
 * @description: 解决if，else地狱
 */
@AllArgsConstructor
public  class ChainUtils<T> {
    /**
     * 存储的值
     */
    private T value;

    public <E> ChainUtils<E> chain(Function<T,E> function) {
        return new ChainUtils<>(function.apply(value));
    }

    /**
     * 获取存储的值
     *
     * @param isNullForException 如果存储的值为null是否抛出异常
     * @return T
     */
    public T getValue(boolean isNullForException) {
        if (isNullForException) {
            Assert.notNull(value, () -> new RuntimeException("chain value is null"));
        }
        return value;
    }
}
