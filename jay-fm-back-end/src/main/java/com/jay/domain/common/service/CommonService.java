package com.jay.domain.common.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 通用service方法
 * @author xxl
 * @since 2024/1/2
 */
public interface CommonService<E> extends IService<E> {
    /**
     * 保存/或者更新
     * @param ts 元数据
     * @param idFunc 查询ID
     */
    @Transactional(rollbackFor = RuntimeException.class)
    default <T> boolean saveOrUpdateBatch(List<T> ts, SFunction<E,?> idFunc) {
        return this.saveOrUpdateBatch(ts,idFunc,null);
    }

    /**
     * 保存/或者更新
     * @param ts  元数据
     * @param idFunc 查询ID
     * @param consumer 消费者传递（原类型、转换类型）
     * @return 是否
     *
     */
    @Transactional(rollbackFor = RuntimeException.class)
    default <T> boolean saveOrUpdateBatch(List<T> ts, SFunction<E,?> idFunc, BiFunction<T,E,Boolean> consumer) {
        return ts.parallelStream().
                allMatch(t -> {
                    Class<E> superClass = this.getEntityClass();

                    //判断两者的Class<?>是否一致
                    E convert;
                    if (superClass.isAssignableFrom(t.getClass())) {
                        convert = (E) t;
                    }else {
                        convert = Convert.convert(superClass, t);
                    }

                    if (consumer != null) {
                        return this.saveOrUpdate(convert, idFunc) && consumer.apply(t,convert);
                    }

                    return this.saveOrUpdate(convert, idFunc);
                });
    }

    /**
     * 更新或者插入
     * @param e 元素
     * @param idFunc 更新的条件
     * @return 是否
     */
    @Transactional(rollbackFor = RuntimeException.class)
    default boolean saveOrUpdate(E e,SFunction<E,?> idFunc) {
        Object apply = idFunc.apply(e);

        if (apply instanceof String) {
            apply = StrUtil.isBlank((String) apply) ? null : apply;
        }

        E val = null;
        if (!Objects.isNull(apply)) {
            val = this.lambdaQuery().
                    eq(idFunc,apply).
                    one();
        }

        boolean isSuccess;
        if (Objects.isNull(val)) {
            //插入操作
            isSuccess = this.save(e);
        }else {
            //更新操作
            BeanUtil.copyProperties(e,val);
            isSuccess = this.updateById(val);
        }

        return isSuccess;
    }

    /**
     * in查询
     * @param condition  查询条件
     * @param val 元数据
     * @return List<E>
     */
    default List<E> list(SFunction<E,?> condition,List<?> val) {
        return this.lambdaQuery().in(condition,val).list();
    }

    /**
     * in查询
     * @param condition  查询条件
     * @param val 元数据
     * @return List<E>
     */
    default List<E> list(SFunction<E,?> condition,Object ...val) {
        return this.lambdaQuery().in(condition,val).list();
    }

    /**
     * in查询
     * @param condition 条件
     * @param val 条件值
     * @param cls  目标类型
     * @param consumer 消费者
     * @return List<T>
     * @param <T> 目标类型
     */
    default <T> List<T> list(SFunction<E,?> condition, Object val, Class<? extends T> cls, Consumer<T> consumer) {
        return this.list(condition, Collections.singletonList(val),cls,consumer);
    }

    /**
     *  查询并返回指定类型
     * @param condition 查询条件
     * @param val 元数据
     * @param cls 需要转化的类型
     * @param consumer 消费者回调函数
     * @return List<T>
     * @param <T> 指定类型
     */
    default <T> List<T> list(SFunction<E,?> condition,List<?> val,Class<? extends T> cls,Consumer<T> consumer) {
        return this.list(condition,val).parallelStream().map(e ->{
            T convert = Convert.convert(cls, e);
            consumer.accept(convert);
            return convert;
        }).collect(Collectors.toList());
    }

    /**
     * 查询并返回指定类型
     * @param wrapper 条件
     * @param cls 转化
     * @param consumer 消费
     * @return  List<T>
     * @param <T> 指定类型
     */
    default <T> List<T> list(LambdaQueryWrapper<E> wrapper, Class<? extends T> cls, Consumer<T> consumer) {
        return this.list(wrapper).parallelStream().map(e ->{
            T convert = Convert.convert(cls, e);
            consumer.accept(convert);
            return convert;
        }).collect(Collectors.toList());
    }

    /**
     * 级联删除
     * @param ids 主表id
     * @param consumer 级联
     * @return boolean
     */
    default <T> boolean removeBatchByIds(Collection<? extends Serializable> ids, Function<Serializable,Boolean> consumer) {
        return  ids.stream().allMatch(t ->{
            //&一个不管前面是否为true后面都执行
            return this.removeById(t) && consumer.apply(t);
        });
    }

    default LambdaQueryWrapper<E> getWrapper() {
        return new LambdaQueryWrapper<>();
    }
}
