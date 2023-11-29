package com.jay.core.web.common;


import com.jay.exception.CommonException;

/**
 * 统一控制器
 * @author xxl
 * @param <E> 返回结果
 * @param <C> 查询条件
 * @param <R> 删除
 * @param <U> 更新
 * @param <D> 插入
 */
public interface ICommonController<E,C,R,U,D> {

    default E insert(C param) throws Throwable {
        return null;
    }

    default  E delete(D id) {
        return null;
    }

    default  E update(U param) throws Throwable {
        return null;
    }

    default  E query(R param) throws CommonException {
        return null;
    }
}
